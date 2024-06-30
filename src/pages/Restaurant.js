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
  const [location, setLocation] = useState(null); //  위치를 저장하고 초기화하는 변수
  const [error, setError] = useState(null);
  const [mapType, setMapTypeId] = useState('');
  const [modalState, setModalState] = useState(false);  //  모달 상태 변수
  const [isRestaurantActive, setIsRestaurantActive] = useState(false);  //  모달의 맛집 토글 활성화 되어있나 평가하는 변수
  const [isTouristSpotActive, setIsTouristSpotActive] = useState(false);  //  모달의 관광지(지금은 은행으로 되어있음) 토글 활성화 되어있나 평가하는 변수
  const [isRestroomActive, setIsRestroomActive] = useState(false);  //  지금은 사용 안되고 있음

  //  geolocation 으로 페이지가 랜더링 됬을 때 유저의 위치를 불러옴

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
          enableHighAccuracy: true, //  높은 정확도로 위치를 가져옴
          timeout: 27000, //  27초동안 정보를 가져오지 못하면 타임아웃 시킴
          maximumAge: 30000 //  위치 정보를 30초 동안만 보관함 ==> 근데 위치를 state로 저장해서 상관 없을것 같은데
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  //  만약 위치변수에 값이 있다면 지도를 초기화하고 마커를 표시해주는 훅 (걍 카카오 맵이라고 생각하셈)

  useEffect(() => {
    if (location) {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";  //  API 키랑 주소값인데 나중에 숨길게요ㅠㅠ...
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

          // 커스텀 마커 이미지 설정
          const markerImageSrc = "../images/myMarker.png";  // 커스텀 마커 이미지 위치
          const markerImageSize = new window.kakao.maps.Size(25, 40);  // 마커 이미지의 크기
          const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

          // 사용자의 현재 위치에 커스텀 마커를 표시
          const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude); //  markerPosition 변수에다가 유저의 현재 위치를 저장
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 커스텀 마커 이미지 적용
          });
          marker.setMap(map);

          fetchDataAndDisplayMarkers(map, location);
        });
      };
    }
  }, [location, isRestaurantActive, isTouristSpotActive]);

  const fetchDataAndDisplayMarkers = async (map, locationData) => {
    try {
      // 맛집 마커 표시
      if (isRestaurantActive) {
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

        // 마커를 맵에 추가
        newMarkers.forEach(marker => {
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          const kakaoMarker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          kakaoMarker.setMap(map);
        });
        console.log(response.data);
      }

      // 관광지 마커 표시
      if (isTouristSpotActive) {
        const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
          data: {
            x: locationData.longitude,
            y: locationData.latitude,
            distan: 1000,
            keyword: "은행",
          },
        });

        const newMarkers = response.data.keywordinfo.category_name.map((x, index) => {
          return {
            x: response.data.keywordinfo.x[index],
            y: response.data.keywordinfo.y[index],
          };
        });

        // 마커를 맵에 추가
        newMarkers.forEach(marker => {
          const markerImageSrc = "../images/tourMarker.png";  // 커스텀 마커 이미지 위치
          const markerImageSize = new window.kakao.maps.Size(25, 40);  // 마커 이미지의 크기
          const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          const tourmarker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 커스텀 마커 이미지 적용
          });
          tourmarker.setMap(map);
        });
      }

    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  const openSettingModal = () => {
    setModalState(!modalState);
  };

  const handleSettingComplete = ({ restaurant, touristSpot, restroom }) => {
    setIsRestaurantActive(restaurant);
    setIsTouristSpotActive(touristSpot);
    setIsRestroomActive(restroom);
    setModalState(false);
  };

  return (
    <Container>
      {modalState && (
        <SettingModal
          closeModal={() => setModalState(false)}
          isRestaurantActive={isRestaurantActive}
          isTouristSpotActive={isTouristSpotActive}
          isRestroomActive={isRestroomActive}
          onComplete={handleSettingComplete}
        />
      )}
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
