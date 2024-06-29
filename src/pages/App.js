import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 80vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 82dvh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

  const StyledVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 92dvh;
    object-fit: cover;
    z-index: -1;
  `;

  const fadeInH1 = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const fadeInH2 = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const fadeInH3 = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const fadeInSpan = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const TextArea = styled.div`
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50px;
      right: 20px;
      text-align: right; 

      h1 {
        animation: ${fadeInH1} 1s ease forwards;
        opacity: 0;
        animation-delay: 1s;
      }

      h2 {
        animation: ${fadeInH2} 1s ease forwards;
        opacity: 0;
        animation-delay: 3s;
      }

      h3 {
        animation: ${fadeInH3} 1s ease forwards;
        opacity: 0;
        animation-delay: 5s;
      }

      span {
        font-size: 50px;
        color: yellow;
        animation: ${fadeInSpan} 1s ease forwards;
        opacity: 0;
        animation-delay: 7s;
        cursor: pointer;

        &:hover {
          font-size: 55px;
        }
      }
    }
  `;

  const LinkStyle = {
    textDecoration: 'none',
    color: 'yellow',
  }

const AppContent = () => {
  return (
    <Container>
      <StyledVideo autoPlay loop muted playsInline>
        <source src={'./videos/cottonbroStudio.mp4'} type='video/mp4' />
      </StyledVideo>
      <TextArea>
        <h1>Any Where</h1>
        <h2>Any Time</h2>
        <h3>when you want</h3>
        <Link to="/Restaurant" style={LinkStyle}><span>Get Started</span></Link>
      </TextArea>
    </Container>
  );
};

const App = () => {
  return <Layout Content={<AppContent/>} />
}

export default App;