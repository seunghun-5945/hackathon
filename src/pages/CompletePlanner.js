import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api" // 로컬 환경의 베이스 URL
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
  border: 1px solid black;
`;

const InfoArea = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid black;
`;

const RowFrame = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  border: 1px solid black;
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
  border: 1px solid black;
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
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: red;
`;

const ListModalMain = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
`;

const ListModalMainRowContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  border: 1px solid black;
`;

const ImageFrame = styled.div`
  width: 40%;
  height: 100%;
  border: 1px solid black;
`;

const InfoContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const InfoFirstFrame = styled.div`
  width: 100%;
  height: 33%;
  border: 1px solid black;
`;

const ListModalMainRow = ({ placeName }) => {
  return (
    <ListModalMainRowContainer>
      <ImageFrame>이미지 들어갈거임</ImageFrame>
      <InfoContainer>
        <InfoFirstFrame>이름: {placeName}</InfoFirstFrame>
        <InfoFirstFrame>주소 들어갈거임</InfoFirstFrame>
        <InfoFirstFrame>무언가 들어갈거임</InfoFirstFrame>
      </InfoContainer>
    </ListModalMainRowContainer>
  );
};

const ListModal = ({ places, toggleModal }) => {
  return (
    <ListModalContainer>
      <ListModalTop>
        리스트 모달임
        <CloseButton onClick={toggleModal}>X</CloseButton>
      </ListModalTop>
      <ListModalMain>
        {places.map((place, index) => (
          <ListModalMainRow key={index} placeName={place} />
        ))}
      </ListModalMain>
    </ListModalContainer>
  );
};

const CompletePlannerContent = () => {
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState({
    lat: 33.450701,
    lng: 126.570667,
  }); // Default coordinates for initialization
  const [modalState, setModalState] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [places, setPlaces] = useState([]);
  const [userPick, setUserPick] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [recognition, setRecognition] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const getScheduleData = async (region) => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/users/get_schedule_data`,
          {
            data: {
              region: region,
            },
          }
        );
        const placeNames = response.data.food.data_info.place_name;
        setPlaceName(placeNames[0]);
        setPlaces(placeNames);
      } catch (error) {
        console.error("Failed to fetch schedule data:", error);
      }
    };
    getScheduleData(localStorage.getItem("region"));
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng && mapContainer.current) {
      const map = new window.kakao.maps.Map(mapContainer.current, {
        center: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        level: 3,
      });
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          coordinates.lat,
          coordinates.lng
        ),
        map: map,
      });
    }
  }, [coordinates]);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleCheck = () => {
    if (userPick.length >= 15) {
      alert("You can only pick up to 15 places.");
      return;
    }
    setUserPick([...userPick, placeName]);
    const nextIndex = currentIndex + 1;
    if (nextIndex < places.length) {
      setCurrentIndex(nextIndex);
      setPlaceName(places[nextIndex]);
    } else {
      setPlaceName(""); // 모든 장소를 다 선택했을 경우 처리 (원하는 방식으로 처리)
    }
  };

  const handleDelete = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < places.length) {
      setCurrentIndex(nextIndex);
      setPlaceName(places[nextIndex]);
    } else {
      setPlaceName(""); // 모든 장소를 다 선택했을 경우 처리 (원하는 방식으로 처리)
    }
  };

  const spend = async () => {
    console.log(placeName);
    try {
      const response = await axiosInstance.post(
        "/chain1",
        { query: placeName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("백엔드로 전송된 가게 이름:", response.data);
    } catch (error) {
      console.error("백엔드로 가게 이름 전송 중 오류 발생:", error);
    }
  };

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
      {modalState && <ListModal places={places} toggleModal={toggleModal} />}
      <MapArea ref={mapContainer} />
      <InfoArea>
        <RowFrame>
          <h2>{placeName}</h2>
        </RowFrame>
        <RowFrame>
          <button onClick={toggleModal}>리스트 확인</button>
        </RowFrame>
      </InfoArea>
      <ButtonArea>
        <ChatButton>
          <BsRobot onClick={spend} />
        </ChatButton>
        <ChatButton>
          <FaMicrophone
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        </ChatButton>
        <ChatButton>
          <MdDelete onClick={handleDelete} />
        </ChatButton>
        <ChatButton>
          <FaCheck onClick={handleCheck} />
        </ChatButton>
      </ButtonArea>
    </Container>
  );
};

const CompletePlanner = () => {
  return <Layout Content={<CompletePlannerContent />} />;
};

export default CompletePlanner;
