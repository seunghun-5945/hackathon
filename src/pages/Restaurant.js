import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { FaMicrophone } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import SettingModal from '../components/SettingModal';
import Layout from "../components/Layout";
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
    height: 92dvh;
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
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          setError(null);
        },
        (error) => {
          setError(error.message);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 27000,
          maximumAge: 30000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          // 3D 지도 타입 설정
          map.setMapTypeId(window.kakao.maps.MapTypeId.NORMAL);

          // 사용자의 현재 위치에 마커를 표시
          const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);

          fetchDataAndDisplayMarkers(map, location);
        });
      };
    }
  }, [location]);

  const fetchDataAndDisplayMarkers = async (map, locationData) => {
    try {
      const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
        data: {
          x: locationData.longitude,
          y: locationData.latitude,
          distan: 1000,
          keyword: "맛집",
        },
      });

      const newMarkers = response.data.keywordinfo.category_name.map((x, index) => {
        return {
          x: response.data.keywordinfo.x[index],
          y: response.data.keywordinfo.y[index],
        };
      });

      setMarkers(newMarkers);

      // 마커를 맵에 추가
      newMarkers.forEach(marker => {
        const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
        const kakaoMarker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        kakaoMarker.setMap(map);
      });

    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  const openSettingModal = () => {
    setModalState(!modalState);
  };

  return (
    <Container>
      {modalState && <SettingModal closeModal={() => setModalState(false)} />}
      <MenuButton onClick={openSettingModal}>
        <VscSettings />
      </MenuButton>
      <div id="map" style={{ width: "100%", height: "100%", zIndex: 1 }}></div>
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
