import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 92dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4a3436;
  }
`;

const Frame = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    height: 70%;
    background-color: white;
    border-radius: 20px;
  }
`;

const TopFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid lightgray;
    color: black;
  }
`;

const MainFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
  }
`;

  const MainRowFrame = styled.div`
    @media (max-width: 768px) {
      width: 70%;
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: black;
    }
  `;

  const StyledInput = styled.input`
    @media (max-width: 768px) {
      width: 80%;
      height: 80%;
      border: none;
      padding: 2%;
      border-radius: 0px;
      border-bottom: 1px solid #5f5f5f;
    }
  `;

const BottomFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

  const StyledButton = styled.button`
    @media (max-width: 768px) {
      width: 80%;
      height: 30%;
      border: none;
      background-color: #4b96f3;
      cursor: pointer;
      color: black;
      font-size: 15px;
    }
  `;

const SignInContent = () => {
  return (
    <Container>
      <Frame>
        <TopFrame><h1>SignIn</h1></TopFrame>
        <MainFrame>
          <MainRowFrame><MdOutlineMailOutline style={{fontSize:"20px"}}/><StyledInput placeholder="아이디를 입력하세요"/></MainRowFrame>
          <MainRowFrame><FiLock style={{fontSize:"20px"}}/><StyledInput placeholder="비밀번호를 입력하세요" type="password"/></MainRowFrame>
        </MainFrame>
        <BottomFrame>
          <StyledButton>로그인</StyledButton>
          <StyledButton style={{backgroundColor: "lightsalmon"}}>취소</StyledButton>
          <MainRowFrame style={{width:"60%", height: "20%", justifyContent: "space-around", color: "gray"}}>
            <h5>아직 회원이 아니신가요?</h5><Link to="/SignUp" style={{textDecoration: "none", color: "gray",}}><h5>회원가입</h5></Link>
            </MainRowFrame>
        </BottomFrame>
      </Frame>
    </Container>
  );
};

const SignIn = () => {
  return <Layout Content={<SignInContent />} />
}

export default SignIn;