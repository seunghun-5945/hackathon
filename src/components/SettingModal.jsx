import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleSwitch from "../components/ToggleSwitch";
import { FaStreetView } from "react-icons/fa";
import { MdSatelliteAlt } from "react-icons/md";
import { MdGpsFixed } from "react-icons/md";

const ModalContainer = styled.div`
  width: 300px;
  height: 400px;
  position: absolute;
  border: 1px solid #eeeeee;
  background-color: white;
  z-index: 500;
`;

const ModalTop = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border-bottom: 2px solid #eeeeee; 
`;

const ModalMain = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalMainTop = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #eeeeee;
`;

const MapViewFrame = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: black;
  font-size: 30px;
  cursor: pointer;

  span {
    font-size: 15px;
  }
`;

const ModalMainBottom = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const RowArea = styled.div`
  width: 70%;
  height: 14%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  font-size: 25px;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4b96f3;
  color: black;
  cursor: pointer;
`;

const SettingModal = ({ closeModal, isRestaurantActive, isTouristSpotActive, isRestroomActive, onComplete, updateMapType }) => {
  
  const [streetView, setStreetView] = useState(false);
  const [satelliteView, setSatelliteView] = useState(false);
  const [dimensionView, setDimensionView] = useState(false);
  const [restaurant, setRestaurant] = useState(isRestaurantActive);
  const [touristSpot, setTouristSpot] = useState(isTouristSpotActive);
  const [restroom, setRestroom] = useState(isRestroomActive);

  const toggleSwitch = (setActive) => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    setRestaurant(isRestaurantActive);
    setTouristSpot(isTouristSpotActive);
    setRestroom(isRestroomActive);
  }, [isRestaurantActive, isTouristSpotActive, isRestroomActive]);

  const handleSaveSettings = () => {
    onComplete({ restaurant, touristSpot, restroom });
    if (window.kakao && window.kakao.maps && window.kakao.maps.MapTypeId) {
      const mapTypeId = window.kakao.maps.MapTypeId;
      if (streetView) {
        localStorage.setItem("mapType", mapTypeId.ROADMAP);
        updateMapType(mapTypeId.ROADMAP);
      } else if (satelliteView) {
        localStorage.setItem("mapType", mapTypeId.HYBRID);
        updateMapType(mapTypeId.HYBRID);
      } else if (dimensionView) {
        localStorage.setItem("mapType", mapTypeId.SKYVIEW);
        updateMapType(mapTypeId.SKYVIEW);
      } 
    }
    closeModal();
  };

  const selectStreetView = () => {
    setStreetView(true);
    setSatelliteView(false);
    setDimensionView(false);
  };

  const selectSatelliteView = () => {
    setStreetView(false);
    setSatelliteView(true);
    setDimensionView(false);
  };

  const selectDimensionView = () => {
    setStreetView(false);
    setSatelliteView(false);
    setDimensionView(true);
  };

  return (
    <ModalContainer>
      <ModalTop>
        <h2>표기항목 설정</h2>
      </ModalTop>
      <ModalMain>
        <ModalMainTop>
          <MapViewFrame onClick={selectStreetView} style={{ color: streetView ? 'blue' : 'black' }}>
            <FaStreetView />
            <span>스트리트 뷰</span>
          </MapViewFrame>
          <MapViewFrame onClick={selectSatelliteView} style={{ color: satelliteView ? 'blue' : 'black' }}>
            <MdSatelliteAlt />
            <span>위성 뷰</span>
          </MapViewFrame>
          <MapViewFrame onClick={selectDimensionView} style={{ color: dimensionView ? 'blue' : 'black' }}>
            <MdGpsFixed />
            <span>3D 뷰</span>
          </MapViewFrame>
        </ModalMainTop>
        <ModalMainBottom>
          <RowArea>
            <h6>맛집</h6>
            <ToggleSwitch
              isActive={restaurant}
              onClick={() => toggleSwitch(setRestaurant)}
            />
          </RowArea>
          <RowArea>
            <h6>관광지</h6>
            <ToggleSwitch
              isActive={touristSpot}
              onClick={() => toggleSwitch(setTouristSpot)}
            />
          </RowArea>
        </ModalMainBottom>
      </ModalMain>
      <ModalFooter onClick={handleSaveSettings}>
        <h3>설정완료</h3>
      </ModalFooter>
    </ModalContainer>
  );
};

export default SettingModal;
