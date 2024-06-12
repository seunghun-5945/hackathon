import React from "react";
import styled from "styled-components";
import keyframes from "styled-components";
import Layout from "../components/Layout";
import Main from "../components/Main";

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

const RestaurantContent = () => {
  return (
    <Container>
    </Container>
  );
};

const Restaurant = () => {
  return <Main Content={<RestaurantContent />} />
}

export default Restaurant;