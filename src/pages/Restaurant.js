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

// 마커 누르면 뜨는 모달창임

const MarkerModalContainer = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #eeeeee;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const MarkerModalTopFrame = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #eeeeee;

  h4 {
    color: gray;
  }
`;

const MarkerModalMainFrame = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MarkerModalBottomFrame = styled.button`
  width: 100%;
  height: 10%;
  background-color: #4b96f3;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;

const MarkerModal = ({ placeName, categoryName, closeModal }) => {
  console.log(placeName, categoryName); // 데이터가 제대로 전달되었는지 콘솔로 확인

  return (
    <MarkerModalContainer>
      <MarkerModalTopFrame>
        <h3>{placeName}</h3>
        <h4>{categoryName}</h4>
      </MarkerModalTopFrame>
      <MarkerModalMainFrame>
        <h4>리뷰</h4>
      </MarkerModalMainFrame>
      <MarkerModalBottomFrame onClick={closeModal}>Close</MarkerModalBottomFrame>
    </MarkerModalContainer>
  );
};

const RestaurantContent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [isRestaurantActive, setIsRestaurantActive] = useState(false);
  const [isTouristSpotActive, setIsTouristSpotActive] = useState(false);
  const [isRestroomActive, setIsRestroomActive] = useState(false);
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

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
            setMap(mapInstance);

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
      const createMarker = (markerPosition, markerData, imageSrc = null) => {
        const markerImage = imageSrc
          ? new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(25, 40))
          : null;

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          console.log("Marker clicked:", markerData);
          setSelectedPlace(markerData);
        });

        marker.setMap(mapInstance);
      };

      if (isRestaurantActive) {
        const response = await axios.post("https://port-0-socket-test-hkty2alqiwtpix.sel4.cloudtype.app/api/getinfo", {
          data: {
            x: locationData.longitude,
            y: locationData.latitude,
            distan: 1000,
            keyword: "맛집",
          },
        });

        console.log("Restaurant data:", response.data);

        const newMarkers = response.data.keywordinfo.category_name.map((_, index) => {
          return {
            x: response.data.keywordinfo.x[index],
            y: response.data.keywordinfo.y[index],
            place_name: response.data.keywordinfo.place_name[index],
            category_name: response.data.keywordinfo.category_name[index],
          };
        });

        newMarkers.forEach(marker => {
          const markerImageSrc = "../images/restaurantMarker.png";
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          createMarker(markerPosition, marker, markerImageSrc);
        });
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

        console.log("Tourist spot data:", response.data);

        const newMarkers = response.data.keywordinfo.category_name.map((_, index) => {
          return {
            x: response.data.keywordinfo.x[index],
            y: response.data.keywordinfo.y[index],
            place_name: response.data.keywordinfo.place_name[index],
            category_name: response.data.keywordinfo.category_name[index],
          };
        });

        newMarkers.forEach(marker => {
          const markerImageSrc = "../images/tourMarker.png";
          const markerPosition = new window.kakao.maps.LatLng(marker.y, marker.x);
          createMarker(markerPosition, marker, markerImageSrc);
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

  const updateMapType = (mapType) => {
    if (map && window.kakao && window.kakao.maps && window.kakao.maps.MapTypeId) {
      map.setMapTypeId(mapType);
    }
  };

  const closeModal = () => {
    setSelectedPlace(null);
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
          updateMapType={updateMapType}
        />
      )}
      {selectedPlace && (
        <MarkerModal 
          placeName={selectedPlace.place_name} 
          categoryName={selectedPlace.category_name}
          closeModal={closeModal} 
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
