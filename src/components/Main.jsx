import React from "react";
import styled, { keyframes } from "styled-components";


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
    height: 92dvh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: white;
    overflow-y: hidden;
  }
`;

const Main = ( {Content} ) => {
  return (
    <Container>
      {Content}
    </Container>
  );
};

export default Main;
