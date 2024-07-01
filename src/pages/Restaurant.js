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
  const [isRestaurantActive, setIsRestaurantActive] = useState(false);
  const [isTouristSpotActive, setIsTouristSpotActive] = useState(false);
  const [isRestroomActive, setIsRestroomActive] = useState(false);
  const [map, setMap] = useState(null); // 맵 객체 상태 추가

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
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Kakao map script loading error'));
        document.head.appendChild(script);
      });
    };

    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();
        window.kakao.maps.load(() => {
          if (location) {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
              level: 3,
            };
            const mapInstance = new window.kakao.maps.Map(container, options);
            setMap(mapInstance); // 맵 객체 설정

            const savedMapType = localStorage.getItem("mapType");
            if (savedMapType && window.kakao && window.kakao.maps && window.kakao.maps.MapTypeId) {
              mapInstance.setMapTypeId(savedMapType);
            }

            const markerImageSrc = "../images/myMarker.png";
            const markerImageSize = new window.kakao.maps.Size(25, 40);
            const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

            const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(mapInstance);

            fetchDataAndDisplayMarkers(mapInstance, location);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      initializeMap();
    }
  }, [location, isRestaurantActive, isTouristSpotActive]);

  const fetchDataAndDisplayMarkers = async (mapInstance, locationData) => {
    try {
      if (isRestaurantActive) {
        const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
          data: {
            x: locationData.longitude,
            y: locationData.latitude,
            distan: 1000,
            keyword: "맛집",
          },
        });

        const newMarkers = response.data.keywordinfo.category_name.map((_, index) => {
          return {
            x: response.data.keywordinfo.x[index],
            y: response.data.keywordinfo.y[index],
          };
        });

        newMarkers.forEach(marker => {
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          const kakaoMarker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          kakaoMarker.setMap(mapInstance);
        });
        console.log(response.data);
      }

      if (isTouristSpotActive) {
        const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
          data: {
            x: locationData.longitude,
            y: locationData.latitude,
            distan: 1000,
            keyword: "은행",
          },
        });

        const newMarkers = response.data.keywordinfo.category_name.map((_, index) => {
          return {
            x: response.data.keywordinfo.x[index],
            y: response.data.keywordinfo.y[index],
          };
        });

        newMarkers.forEach(marker => {
          const markerImageSrc = "../images/tourMarker.png";
          const markerImageSize = new window.kakao.maps.Size(25, 40);
          const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          const tourmarker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
          });
          tourmarker.setMap(mapInstance);
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

  // Add function to update map type
  const updateMapType = (mapType) => {
    if (map && window.kakao && window.kakao.maps && window.kakao.maps.MapTypeId) {
      map.setMapTypeId(mapType);
    }
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
          updateMapType={updateMapType} // Pass function to update map type
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
