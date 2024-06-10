import React from "react";
import styled from "styled-components";
import { IoMdHome } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { PiCompassRoseLight } from "react-icons/pi";

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: yellow;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 8dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border-bottom: 3px solid lightgray;

    svg {
      font-size: 30px;
    }
  }
`;

  const HeaderFrame = styled.div`
    @media (max-width: 768px) {
      width: 90%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      color: black;

        svg {
          font-size: 30px;
        }
      }
    `;

    const TitleFrame = styled.div`
      @media (max-width: 768px) {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
      }
    `;

const Header = () => {
  return (
    <Container>
      <HeaderFrame>
        <IoMdHome />
          <TitleFrame>
            <PiCompassRoseLight />
            <h2>ANYWHERE</h2>
          </TitleFrame>
        <TiThMenu />
      </HeaderFrame>
    </Container>
  );
};

export default Header;
