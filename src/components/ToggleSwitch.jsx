import React from "react";
import styled, { keyframes } from "styled-components";

const changeColorLeft = keyframes`
  from {
    background-color: lightgreen;
  }
  to {
    background-color: lightgray;
  }
`;

const changeColorRight = keyframes`
  from {
    background-color: lightgray;
  }
  to {
    background-color: lightgreen;
  }
`;

const Container = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "lightgreen" : "lightgray")};
  animation: ${({ isActive }) => (isActive ? changeColorRight : changeColorLeft)} 0.3s forwards;
`;

const Frame = styled.div`
  width: 74px;
  height: 34px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  position: relative;
`;

const moveRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(40px);
  }
`;

const moveLeft = keyframes`
  from {
    transform: translateX(40px);
  }
  to {
    transform: translateX(0);
  }
`;

const ToggleBtn = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  border-radius: 50%;
  background-color: white;
  animation: ${({ isActive }) => (isActive ? moveLeft : moveRight)} 0.3s forwards;
`;

const ToggleSwitch = ({ isActive, onClick }) => {
  return (
    <Container isActive={isActive} onClick={onClick}>
      <Frame>
        <ToggleBtn isActive={isActive} />
      </Frame>
    </Container>
  );
};

export default ToggleSwitch;
