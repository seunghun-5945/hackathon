import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FaCheck } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import axios from "axios";
import { useLocation } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8001/api" // 로컬 환경의 베이스 URL
      : "https://port-0-fastapi-dc9c2nlsw04cjb.sel5.cloudtype.app/api", // 배포 환경의 베이스 URL
});

const Container = styled.div`
  width: 100%;
  height: 92dvh;
  background-color: white;
`;

const MapArea = styled.div`
  width: 100%;
  height: 60%;
  min-height: 300px; /* 최소 높이 설정 */
  background-color: black;
`;

const InfoArea = styled.div`
  width: 100%;
  height: 20%;
`;

const RowFrame = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: black;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ChatButton = styled.div`
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 50%;
    margin: 4%;
    font-size: 40px;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const ListButton = styled.button`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5% 0 5%;
  background-color: lightgray;
  border-radius: 20px;
`;

const ListModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ListModalTop = styled.div`
  width: 100%;
  height: 10%;
  color: black;
  display: flex;
  background-color: black;
  color: white;
  border-bottom: 1px solid black;
  align-items: center;
  justify-content: space-between;
  padding: 0 5% 0 5%;
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const ListModalMain = styled.div`
  width: 100%;
  height: 90%;
  border: none;
  overflow-y: scroll;
`;

const ListModalMainRowContainer = styled.div`
  width: 100%;
  height: 25%;
  padding: 5% 0 10% 5%;
  display: flex;
  background-color: white;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  color: gray;
`;

const ListContainer = styled.div`
  width: 40%;
  height: 100%;
  border-bottom: 1px solid black;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  border: none;
`;

const InfoFirstFrame = styled.div`
  width: 100%;
  height: 33%;
  border: none;
  h3 {
    color: black;
  }
`;

const RestModalContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 1000;
    color: black;
  }
`;

const RestModalTextFrame = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const RestModal = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return '.';
        }
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <RestModalContainer>
      <img src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_256.gif" style={{width: "30%"}}/>
      <RestModalTextFrame>
        <h1>플래너 작성 대기중{dots}</h1>
      </RestModalTextFrame>
    </RestModalContainer>
  );
};

const ListModalMainRow = ({ place }) => (
  <ListModalMainRowContainer>
    <InfoContainer>
      <InfoFirstFrame>
        <h3>{place.placeName}</h3>
      </InfoFirstFrame>
      <InfoFirstFrame>위치: {place.address}</InfoFirstFrame>
      <InfoFirstFrame>카테고리: {place.category}</InfoFirstFrame>
    </InfoContainer>
  </ListModalMainRowContainer>
);

const ListModal = ({ userPick, toggleModal }) => (
  <ListModalContainer>
    <ListModalTop>
      <h2>Planner List</h2>
      <CloseButton onClick={toggleModal}>X</CloseButton>
    </ListModalTop>
    <ListModalMain>
      {userPick.map((place, index) => (
        <ListModalMainRow key={index} place={place} />
      ))}
    </ListModalMain>
  </ListModalContainer>
);



const CompletePlannerContent = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(localStorage.getItem("lat")) || 37.5665,
    lng: parseFloat(localStorage.getItem("lng")) || 126.9780
  });
  
  const [modalState, setModalState] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [foodAddress, setFoodAddress] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [userPick, setUserPick] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const websocket = useRef(null);
  const [connected, setConnected] = useState(false);
  const [restModalState, setRestModalState] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (responseData) {
      console.log('Received response data:', responseData);
      // 여기서 responseData를 사용하여 필요한 상태를 설정하거나 작업을 수행할 수 있습니다.
      // 예: setCoordinates, setPlaceName 등
    }
  }, [responseData]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapContainer.current && coordinates) {
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: new window.kakao.maps.LatLng(coordinates.lng, coordinates.lat),
            level: 3,
          });
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(coordinates.lng, coordinates.lat),
            map: map
          });
        }
      });
    };
    document.head.appendChild(script);
  }, [coordinates]);
  

  useEffect(() => {
    const getScheduleData = async (region) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8001/api/users/get_schedule_data`, {
          data: { region }
        });
        console.log(response.data);
        console.log(response.data.food.data_info.category_name);
        const placeNames = response.data.food.data_info.place_name;
        const foodAddresses = response.data.food.data_info.address_name;
        const foodCategory = response.data.food.data_info.category_name;
        setPlaceName(placeNames[0]);
        setFoodAddress(foodAddresses);
        setFoodCategory(foodCategory);
        setFoodPlaces(placeNames);
      } catch (error) {
        console.error("Failed to fetch schedule data:", error);
      }
    };
    getScheduleData(localStorage.getItem('region'));
  }, []);

  const connectWebSocket = () => {
    const nickName = localStorage.getItem('NickName');
    const code = parseInt(localStorage.getItem("Code"));
    websocket.current = new WebSocket(`ws://127.0.0.1:8001/api/ws/${nickName}/${code}`);

    websocket.current.onopen = () => {
      console.log("WebSocket connection established");
      setConnected(true);
    };

    websocket.current.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);
    };

    websocket.current.onmessage = (event) => {
      try {
        console.log('Received WebSocket message:', event.data); // 메시지 로그 출력
        const data = JSON.parse(event.data);
    
        // 서버에서 'true' 메시지를 받은 경우 페이지 이동
        if (event.data === 'true') {
          window.location.href = '/Result'; // 이동할 페이지 경로로 변경하세요
        }
    
        if (data.type === 'confirm') {
          if (data.index === currentIndex) {
            setUserPick((prevPick) => [...prevPick, {
              placeName: foodPlaces[currentIndex],
              address: foodAddress[currentIndex],
              category: foodCategory[currentIndex]
            }]);
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message as JSON:', error);
      }
    };
    
    

    websocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const sendListToServer = async (userPickData) => {
    const payload = {
      data: {
        user_list: userPickData,
        user: localStorage.getItem("NickName"),
        num: parseInt(localStorage.getItem("Code")),
      },
    };

    try {
      const response = await axios.post("http://localhost:8001/api/list_add", payload, {
        withCredentials: true
      });
      alert("리스트가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (event) => {
    event.preventDefault();
    if (currentIndex >= foodPlaces.length - 1) {
      alert('마지막 항목입니다!');
      setRestModalState(true);
      
      const userPickData = [...userPick, {
        placeName: foodPlaces[currentIndex]
      }].map(item => item.placeName);

      await sendListToServer(userPickData);
    }

    setUserPick([...userPick, {
      placeName: foodPlaces[currentIndex],
      address: foodAddress[currentIndex],
      category: foodCategory[currentIndex]
    }]);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setPlaceName(foodPlaces[nextIndex]);
  };

  const handleDelete = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < foodPlaces.length) {
      setCurrentIndex(nextIndex);
      setPlaceName(foodPlaces[nextIndex]);
    } else {
      alert('마지막 항목입니다!');
      setPlaceName('');
      setRestModalState(true);
      
      const userPickData = userPick.map(item => item.placeName);
      
      await sendListToServer(userPickData);
    }
  };

  const Chain = async () => {
    try {
      const response = await axiosInstance.post(
        "/chain",
        { query: placeName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("백엔드로 전송된 가게 이름:", response.data);
    }
    catch (error) {
      console.error("백엔드로 가게 이름 전송 중 오류 발생:", error);
    }
  }

  useEffect(() => {
    const sendTranscriptToBackend = async (text) => {
      try {
        console.log("백엔드로 전송할 텍스트:", text);
        const response = await axiosInstance.post(
          "/request",
          { question: text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("백엔드로부터 받은 응답:", response.data);

        const responseData =
          typeof response.data === "string"
            ? response.data
            : response.data.answer;

        if (responseData) {
          setResponseText(responseData);
          speakText(responseData);
        } else {
          console.error("응답 데이터가 올바르지 않습니다:", response.data);
        }
      } catch (error) {
        console.error("백엔드로 텍스트 전송 중 오류 발생:", error);
      }
    };

    if (!recognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
        return;
      }
      const newRecognition = new SpeechRecognition();
      newRecognition.lang = "ko-KR";
      newRecognition.onstart = () => {
        console.log("음성 인식 시작");
      };
      newRecognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        console.log("인식된 텍스트:", speechToText);
        setTranscript(speechToText);
        sendTranscriptToBackend(speechToText);
      };
      newRecognition.onend = () => {
        console.log("음성 인식 종료");
      };
      setRecognition(newRecognition);
    }
  }, [recognition]);

  const handleMouseDown = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleMouseUp = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      console.error("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.onstart = () => {
      console.log("음성 합성 시작:", text);
    };
    utterance.onend = () => {
      console.log("음성 합성 종료");
    };
    utterance.onerror = (event) => {
      console.error("음성 합성 중 오류 발생:", event.error);
    };
    synth.speak(utterance);
  };

  return (
    <Container>
      {restModalState && <RestModal/>}
      {modalState && <ListModal userPick={userPick} toggleModal={toggleModal} />}
      <MapArea ref={mapContainer} />
      <InfoArea>
        <RowFrame><h2>{placeName}</h2></RowFrame>
        <RowFrame>
          <ListButton onClick={toggleModal}><GoChecklist fontSize={25}/><h3>리스트 확인</h3></ListButton>
        </RowFrame>
      </InfoArea>
      <ButtonArea>
        <ChatButton>
          <BsRobot onClick={Chain} />
        </ChatButton>
        <ChatButton>
          <FaMicrophone  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}/>
        </ChatButton>
        <ChatButton>
          <MdDelete onClick={handleDelete} color="red" />
        </ChatButton>
        <ChatButton>
          <FaCheck onClick={handleCheck} color="lightgreen" />
        </ChatButton>
      </ButtonArea>
    </Container>
  );
};

const CompletePlanner = () => {
  return <Layout Content={<CompletePlannerContent />} />;
};

export default CompletePlanner;
