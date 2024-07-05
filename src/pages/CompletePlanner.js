import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { FaCheck } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import axios from 'axios';

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
        <InfoFirstFrame>
          이름: {placeName}
        </InfoFirstFrame>
        <InfoFirstFrame>
          주소 들어갈거임
        </InfoFirstFrame>
        <InfoFirstFrame>
          무언가 들어갈거임
        </InfoFirstFrame>
      </InfoContainer>
    </ListModalMainRowContainer>
  )
}

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
  )
}

const CompletePlannerContent = () => {
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 }); // Default coordinates for initialization
  const [modalState, setModalState] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState([]);
  const [userPick, setUserPick] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const websocket = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getScheduleData = async (region) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/users/get_schedule_data`, {
          data: {
            region: region
          }
        });
        const placeNames = response.data.food.data_info.place_name;
        setPlaceName(placeNames[0]);
        setPlaces(placeNames);
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      }
    };
    getScheduleData(localStorage.getItem('region'));
    connectWebSocket()
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng && mapContainer.current) {
      const map = new window.kakao.maps.Map(mapContainer.current, {
        center: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        level: 3,
      });
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        map: map
      });
    }
  }, [coordinates]);

  const connectWebSocket = () => {
    const nickName = localStorage.getItem('NickName')
    const code = parseInt(localStorage.getItem("Code"))
    websocket.current = new WebSocket(`ws://127.0.0.1:8000/api/ws/${nickName}/${code}`);

    websocket.current.onopen = () => {
      console.log('WebSocket connection established');
      setConnected(true);
    };

    websocket.current.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
    };

    websocket.current.onmessage = (event) => {
      const data = event.data;
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    websocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleCheck = () => {
    if (userPick.length >= 15) {
      alert('You can only pick up to 15 places.');
      return;
    }
    setUserPick([...userPick, placeName]);
    const nextIndex = currentIndex + 1;
    if (nextIndex < places.length) {
      setCurrentIndex(nextIndex);
      setPlaceName(places[nextIndex]);
    } else {
      setPlaceName(''); // 모든 장소를 다 선택했을 경우 처리 (원하는 방식으로 처리)
    }
  };

  const handleDelete = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < places.length) {
      setCurrentIndex(nextIndex);
      setPlaceName(places[nextIndex]);
    } else {
      setPlaceName(''); // 모든 장소를 다 선택했을 경우 처리 (원하는 방식으로 처리)
    }
  };

  return (
    <Container>
      {modalState && <ListModal places={places} toggleModal={toggleModal} />}
      <MapArea ref={mapContainer} />
      <InfoArea>
        <RowFrame><h2>{placeName}</h2></RowFrame>
        <RowFrame><button onClick={toggleModal}>리스트 확인</button></RowFrame>
      </InfoArea>
      <ButtonArea>
        <ChatButton>
          <BsRobot onClick={() => { console.log(placeName, userPick) }}/>
        </ChatButton>
        <ChatButton>
          <FaMicrophone />
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
