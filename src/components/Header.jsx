import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 8dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1000;
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
    transform: translateX(0%);
  }
  to {
    transform: translateX(200%);
  }
`;

const MenuContainer = styled.div`
  @media (max-width: 768px) {
    width: 60%;
    height: 92dvh;
    display: flex;
    flex-direction: column;
    right: 0px;
    background-color: white;
    color: black;
    opacity: 0.9;
    position: absolute;
    z-index: 1000;
    animation: ${({ openMenu }) => (openMenu ? slideOpen : slideClose)} 0.8s ease forwards;
  }
`;

const MenuFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
  }
`;

const MenuItem = styled(Link)`
  width: 100%;
  height: 8dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: white;
    color: black;
    font-size: 20px;
  }
    h3 {
      color: black;
    }
`;

const MenuFootFrame = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 80%;
    height: 80%;
  }
`;

const Menu = ({ openMenu, onAnimationEnd }) => {

  return (
    <MenuContainer openMenu={openMenu} onAnimationEnd={onAnimationEnd}>
      <MenuFrame>
        <MenuItem to="/SignIn">
          <h3>로그인 / 회원가입</h3>
        </MenuItem>
        <MenuItem to="/restaurant">
          <h3>지도로 탐색</h3>
        </MenuItem>
        <MenuItem>
          <h3>찜 목록</h3>
        </MenuItem>
        <MenuItem>
          <h3>사용자 맞춤 추천</h3>
        </MenuItem>
        <MenuItem to="/guide">
          <h3>어플 사용 가이드</h3>
        </MenuItem>
        <MenuItem to="/planner">
          <h3>플래너 짜기</h3>
        </MenuItem>
      </MenuFrame>
      <MenuFootFrame>
        <img src="./images/Icon.png"/>
      </MenuFootFrame>
    </MenuContainer>
  );
};

const Header = () => {
  const [openMenu, setMenu] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      setRenderMenu(true);
    }
  }, [openMenu]);

  const handleMenu = () => {
    if (openMenu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const handleAnimationEnd = () => {
    if (!openMenu) {
      setRenderMenu(false);
    }
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
            <IoCloseSharp onClick={handleMenu} style={{fontSize:"30px"}} />
          ) : (
            <TiThMenu onClick={handleMenu} />
          )}
        </HeaderFrame>
      </Container>
      {renderMenu && <Menu openMenu={openMenu} onAnimationEnd={handleAnimationEnd} />}
    </>
  );
};

export default Header;
