import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { FaCheck } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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
    width: 80px;
    height: 80px;
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

const ListModalMainRow = () => {
  return (
    <ListModalMainRowContainer>
      <ImageFrame>이미지 들어갈거임</ImageFrame>
      <InfoContainer>
        <InfoFirstFrame>
          이름 들어갈거임
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

const ListModal = () => {
  return (
    <ListModalContainer>
      <ListModalTop>
        리스트 모달임
        <CloseButton>X</CloseButton>
      </ListModalTop>
      <ListModalMain>
        <ListModalMainRow></ListModalMainRow>
        <ListModalMainRow></ListModalMainRow>
        <ListModalMainRow></ListModalMainRow>
        <ListModalMainRow></ListModalMainRow>
      </ListModalMain>
    </ListModalContainer>
  )
}

const CompletePlannerContent = () => {
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 }); // Default coordinates for initialization
  const [modalState, setModalState] = useState(false);
  const [placeName, setPlaceName] = useState('')

  useEffect(() => {
    const getScheduleData = async (region) => {
      try {
        const response = await axios.post(`http://localhost:8000/api/users/get_schedule_data`, {
          data: {
            region: region
          }
        });
        console.log(response.data.food.data_info.place_name[0]);
        setPlaceName(response.data.food.data_info.place_name[0]);
        console.log(placeName);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
        throw error;
      }
    };
    console.log(getScheduleData(localStorage.getItem('region')))
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

  const toggleModal = () => {
    setModalState(!modalState);
  };

  return (
    <Container>
      {modalState && <ListModal />}
      <MapArea ref={mapContainer} />
      <InfoArea>
        <RowFrame><h2>이름</h2><h2>asdasd</h2></RowFrame>
        <RowFrame><h2>주소</h2><button onClick={toggleModal}>리스트</button></RowFrame>
      </InfoArea>
      <ButtonArea>
        <ChatButton>
          <MdDelete />
        </ChatButton>
        <ChatButton>
          <FaMicrophone onClick={()=> {console.log(placeName)}}/>
        </ChatButton>
        <ChatButton>
          <FaCheck />
        </ChatButton>
      </ButtonArea>
    </Container>
  );
};

const CompletePlanner = () => {
  return <Layout Content={<CompletePlannerContent />} />;
};

export default CompletePlanner;
