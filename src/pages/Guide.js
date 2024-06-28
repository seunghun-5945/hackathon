import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: auto;
  dispaly: flex;
  justify-content: column;
  align-items: center;
  background-color: #eeeeee;
  overflow-y: scroll;
  color: red;
`;

const TextBox = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 82dvh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  img {
    width: 80%;
    height: 80%;
  }
`;

const GuideContent = () => {
  return (
    <Container>
      <TextBox>
        <h1>Step1. select your language</h1>
      </TextBox>
      <ImageBox>
        <img src="./images/help1.png"/>
      </ImageBox>
      
      <TextBox>
        <h1>Step2. Choose your location</h1>
      </TextBox>
      <ImageBox>
        <img src="./images/help1.png"/>
      </ImageBox>
    </Container>
  )
}

const Guide = () => {
  return <Layout Content={<GuideContent/>} />
}

export default Guide;