import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { FaMicrophone } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import SettingModal from '../components/SettingModal';
import Layout from "../components/Layout";
import Modal from '../components/Modal';
import axios from 'axios';

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 80vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 82dvh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const StyledButton = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  font-size: 30px;
  z-index: 50;
  cursor: pointer;
  color: black;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  top: 20px;
  left: 10px;
  z-index: 50;
  font-size: 50px;
  color: black;
`;

const RestaurantContent = () => {
  const { state } = useLocation();
  const [locationResult, setLocationResult] = useState(state);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";  // api 키 값인데 나중에 숨겨야함
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(locationResult?.latitude,locationResult?.longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 3D 지도 타입 설정
        map.setMapTypeId(window.kakao.maps.MapTypeId.NORMAL);
      });
    };
  }, [locationResult]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
          "data": {
            "x": locationResult?.longitude,
            "y": locationResult?.latitude,
            "distan": 1000,
            "keyword": "맛집"
          }
        })
        console.log(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchData();
  }, [[locationResult]]);

  const openSettingModal = () => {
    setModalState(!modalState);
  }

  return (
    <Container>
      {modalState && <SettingModal closeModal={() => setModalState(false)} />}
      <MenuButton onClick={openSettingModal}>
        <VscSettings />
      </MenuButton>
      <div id="map" style={{ width: '100%', height: '100%', zIndex: 1 }}></div>
      <StyledButton>
        <FaMicrophone />
      </StyledButton>
    </Container>
  );
};

const Restaurant = () => {
  return <Layout Content={<RestaurantContent />} />;
};

export default Restaurant;
