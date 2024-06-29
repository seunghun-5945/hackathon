import React, { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "../components/ToggleSwitch";
import { FaStreetView } from "react-icons/fa";
import { MdSatelliteAlt } from "react-icons/md";
import { MdGpsFixed } from "react-icons/md";

const ModalContainer = styled.div`
  width: 300px;
  height: 400px;
  position: absolute;
  border-radius: 15px;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: black;
    font-size: 30px;

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
  border-radius: 0 0 15px 15px;
  background-color: lightsalmon;
  color: black;
  cursor: pointer;
`;

const SettingModal = ({ closeModal }) => {
  const [isRestaurantActive, setIsRestaurantActive] = useState(false);
  const [isTouristSpotActive, setIsTouristSpotActive] = useState(false);
  const [isRestroomActive, setIsRestroomActive] = useState(false);

  const toggleSwitch = (setActive) => {
    setActive((prev) => !prev);
  };

  return (
    <ModalContainer>
      <ModalTop>
        <h2>표기항목 설정</h2>
      </ModalTop>
      <ModalMain>
        <ModalMainTop>
          <MapViewFrame>
            <FaStreetView />
            <span>스트리트 뷰</span>
          </MapViewFrame>
          <MapViewFrame>
            <MdSatelliteAlt />
            <span>위성 뷰</span>
          </MapViewFrame>
          <MapViewFrame>
            <MdGpsFixed />
            <span>3D 뷰</span>
          </MapViewFrame>
        </ModalMainTop>

        <ModalMainBottom>
          <RowArea>
            <h5>맛집</h5>
            <ToggleSwitch
              isActive={isRestaurantActive}
              onClick={() => toggleSwitch(setIsRestaurantActive)}
            />
          </RowArea>
          <RowArea>
            <h5>관광지</h5>
            <ToggleSwitch
              isActive={isTouristSpotActive}
              onClick={() => toggleSwitch(setIsTouristSpotActive)}
            />
          </RowArea>
          <RowArea>
            <h5>공중화장실</h5>
            <ToggleSwitch
              isActive={isRestroomActive}
              onClick={() => toggleSwitch(setIsRestroomActive)}
            />
          </RowArea>
        </ModalMainBottom>
      </ModalMain>
      <ModalFooter onClick={closeModal}>
        <h3>설정완료</h3>
      </ModalFooter>
    </ModalContainer>
  );
};

export default SettingModal;
