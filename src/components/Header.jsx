import React, { useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { IoMdHome } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { PiCompassRoseLight } from "react-icons/pi";

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 8dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    background-color: white;
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
      z-index: 2;
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

    const slideDown = keyframes`
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  `;
  
  const slideUp = keyframes`
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  `;
  

      const MenuFrame = styled.div`
        @media (max-width: 768px) {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          background-color: black;
          opacity: 0.8;
          position: absolute;
          z-index: 1;
          animation: ${({ openMenu }) => (openMenu ? slideUp : slideDown)} 0.8s ease forwards; // openMenu 상태에 따라 애니메이션 적용
        }
      `;

        const MenuItem = styled.div`
          width: 100%;
          height: 8dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid white;
          color: white;
          &:hover {
            background-color: white;
            color: black;
            font-size: 20px;
          }
        `;

      const Menu = () => {
        return (
          <MenuFrame>
            <MenuItem>
              <h3>여행 준비 가이드</h3>
            </MenuItem>
            <MenuItem>
              <h3>근처 맛집 찾기</h3>
            </MenuItem>
            <MenuItem>
              <h3>근처 관광지 찾기</h3>
            </MenuItem>
            <MenuItem>
              <h3>개발자 소개</h3>
            </MenuItem>
          </MenuFrame>
        )
      }

const Header = () => {

  const [openMenu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!openMenu); // openMenu 상태를 반전시킵니다.
  };
  
  return (
    <>
      <Container>
        <HeaderFrame>
          <IoMdHome />
            <TitleFrame>
              <PiCompassRoseLight />
              <h2>ANYWHERE</h2>
            </TitleFrame>
            {openMenu ? (
            <IoCloseSharp onClick={handleMenu}  style={{fontSize:"30px"}} />
            ) : (
            <TiThMenu onClick={handleMenu} />
            )}
        </HeaderFrame>
      </Container>
      {openMenu && <Menu/>}
    </>
  );
};

export default Header;
