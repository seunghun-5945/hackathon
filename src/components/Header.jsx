import React, { useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { IoMdHome } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { PiCompassRoseLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const Container = styled.div`
  @media (min-width: 1920px) {
    min-width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-X: hidden;
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

      a {
        text-decoration: none;
        color: black;
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

    const slideOpen = keyframes`
      from {
        transform: translateX(200%);
      }
      to {
        transform: translateX(0%);
      }
    `;
    
    const slideClose = keyframes`
      from {
        transform: translateX(200%);
      }
      to {
        transform: translateX(0%);
      }
    `;
  

      const MenuContainer = styled.div`
        @media (max-width: 768px) {
          width: 60%;
          height: 82dvh;
          display: flex;
          flex-direction: column;
          right: 0px;
          background-color: black;
          opacity: 0.6;
          position: absolute;
          z-index: 1;
          animation: ${({ openMenu }) => (openMenu ? slideOpen : slideClose)} 0.8s ease forwards; // openMenu 상태에 따라 애니메이션 적용
        }
      `;

        const MenuFrame = styled.div`
          @media (max-width: 768px) {
            width: 100%;
            height: 70%;
          }
        `;

          const MenuItem = styled.div`
            width: 100%;
            height: 8dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid white;
            color: white;
            &:hover {
              background-color: white;
              color: black;
              font-size: 20px;
            }
          `;
          
        const MenuFootFrame = styled.div`
          width: 100%;
          height: 30%;
          display: flex;
          alignt-items: center;
          justify-content: center;
          img {
            width: 80%;
            height: 80%;
          }
        `;

      const Menu = () => {
        return (
          <MenuContainer>
            <MenuFrame>
              <MenuItem>
                <h3>어플 사용 가이드</h3>
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
            <MenuFootFrame>
              <img src="./images/Icon.png"/>
            </MenuFootFrame>
          </MenuContainer>
        )
      }

const Header = () => {

  const [openMenu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!openMenu); 
    console.log(openMenu);
  };
  
  return (
    <>
      <Container>
        <HeaderFrame>
          <Link to="/"><IoMdHome /></Link>
            <TitleFrame>
            <Link to="/" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <PiCompassRoseLight />
              <h2>ANYWHERE</h2>
              </Link>
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
