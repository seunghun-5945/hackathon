import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";

const Container = styled.div`
  @media (max-width: 768px) {
    min-width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
  }
`;

const ResultContent = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8001/api/socket/list_com", {
        })
        console.log(response.data);
      }
      catch (error) {
        console.log("에러남:", error)
      }
    }
    fetchData();
  }, [])

  return (
    <Container>
      <h1>sibal</h1>
    </Container>
  );
};

const Result = () => {
  return <Layout Content={<ResultContent />} />;
};

export default Result;