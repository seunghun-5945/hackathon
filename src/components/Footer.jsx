import React from "react";
import styled from "styled-components";
import { MdLanguage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { IoMdHelp } from "react-icons/io";
import { Link } from "react-router-dom";

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: salmon;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 15dvh;
    display: flex;
    border-top: 3px solid lightgray;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    color: black;
    font-size: 20px;
  }
`;

const MenuBox = styled(Link)`
  width: 25%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border: none;
  background: none;
  touch-action: manipulation;
  &:focus {
    outline: none;
  }
`;

const Footer = () => {
  return (
    <Container>
      <MenuBox to="/">
        <MdLanguage />
        <h5>언어설정</h5>
      </MenuBox>
      
      <MenuBox to="/restaurant">
        <FaLocationDot />
        <h5>위치설정</h5>
      </MenuBox>
      
      <MenuBox to="/restaurant">
        <IoRestaurant />
        <h5>맛집</h5>
      </MenuBox>

      <MenuBox to="/guide">
        <IoMdHelp />
        <h5>사용법</h5>
      </MenuBox>
    </Container>
  );
};

export default Footer;
