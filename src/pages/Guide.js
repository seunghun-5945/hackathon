import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 82dvh;
  background-color: lightsalmon;
`;

const GuideContent = () => {
  return (
    <Container>

    </Container>
  )
}

const Guide = () => {
  return <Layout Content={<GuideContent/>} />
}

export default Guide;