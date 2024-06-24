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
    height: 10dvh;
    display: flex;
    border-top: 3px solid lightgray;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
  }
`;

  const MenuBox = styled.div`
    width: 25%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    a {
     width: 1000px;
    }
  `;


const Footer = () => {
  return (
    <Container>
      <MenuBox>
        <MdLanguage />
        <h5>언어설정</h5>
      </MenuBox>
      
      <MenuBox>
      <FaLocationDot />
        <h5>위치설정</h5>
      </MenuBox>
      
      <MenuBox>
        <IoRestaurant />
        <h5>맛집</h5>
      </MenuBox>
      <MenuBox>
        <IoMdHelp />
        <h5>사용법</h5>
      </MenuBox>
    </Container>
  );
};

export default Footer;
