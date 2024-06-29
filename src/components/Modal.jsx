import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
  z-index: 500; 
`;

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  border-bottom: 2px solid #efefef;
`;

const Main = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #efefef;
`;

const Footer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7c98fc;
  border-radius: 0 0 20px 20px;
  cursor: pointer;
  color: white;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #7c98fc;
  color: white;
  font-size: 20px;
`;

const Modal = ({ closeModal }) => {
  return (
    <Container>
      <Header>위치설정</Header>
      <Main>
        <StyledButton style={{width: "150px",}}>자동설정</StyledButton>
      </Main>
      <Footer onClick={closeModal}>
        <h4>닫기</h4>
      </Footer>
    </Container>
  );
};

export default Modal;
