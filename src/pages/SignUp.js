import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { GoShieldLock } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 92dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: salmon;
  }
`;

const Frame = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
    background-color: white;
    border-radius: 20px;
  }
`;

const TopFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px 20px 0 0;
    border-bottom: 2px solid #eeeeee;
    color: black;
  }
`;

const MainFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

  const MainRowFrame = styled.div`
    @media (max-width: 768px) {
      width: 70%;
      height: 25%;
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
      &:focus {
        outline: none;
        border-bottom: 2px solid violet;
      }
        font-size: 15px;
    }
`;

const BottomFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 30%;
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
    font-size: 20px;
  }
`;

const SignUpContent = () => {
  return (
    <Container>
      <Frame>
        <TopFrame><h1>SignUp</h1></TopFrame>
        <MainFrame>
          <MainRowFrame>
            <MdOutlineMailOutline style={{fontSize:"20px"}}/>
            <StyledInput placeholder="아이디를 입력해주세요"/>
          </MainRowFrame>
          <MainRowFrame>
            <FaRegUser />
            <StyledInput placeholder="이름을 입력하세요"/>
          </MainRowFrame>
          <MainRowFrame>
            <FiLock style={{fontSize:"20px"}}/>
            <StyledInput placeholder="비밀번호를 입력해주세요" type="password"/>
          </MainRowFrame>
          <MainRowFrame>
            <GoShieldLock style={{fontSize:"20px"}}/>
            <StyledInput placeholder="비밀번호를 다시 입력해주세요" type="password"/>
          </MainRowFrame>
        </MainFrame>
        <BottomFrame>
          <StyledButton>회원가입</StyledButton>
          <StyledButton style={{backgroundColor:"#4a3436", color:"white"}}>취소</StyledButton>
        </BottomFrame>
      </Frame>
    </Container>
  );
};

const SignUp = () => {
  return <Layout Content={<SignUpContent />} />
}

export default SignUp;