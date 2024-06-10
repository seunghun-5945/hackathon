import React from "react";
import styled from "styled-components";
import { BrowserView, MobileView } from "react-device-detect";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: salmon;
`;

const App = () => {
  return <Layout/>
}

export default App;