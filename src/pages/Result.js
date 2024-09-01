import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";

const Container = styled.div`
  @media (max-width: 768px) {
    min-width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
  }
`;

const TopFrame = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 25%;
  background-color: white;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

const Frame = styled.div`
  width: 100%;
  height: 90%;
`;

const ListFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('your-image-url.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  overflow-y: auto; // 내용이 많을 경우 스크롤 가능하도록 설정
  padding-bottom: 50px; // 하단에 여유 공간 추가
`;

const RowFrameContainer = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  margin-bottom: 5%;
  padding-left: 5%;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  background-color: rgba(255, 255, 255, 0.8);
`;

const RowFrame = ({ name, category, address }) => {
  return (
    <Frame>
    <RowFrameContainer>
      <span style={{fontSize:23, fontWeight:"bold"}}>{name}</span>
      <h4 style={{color:"gray"}}>{category}</h4>
      <h5 style={{color:"lightgray"}}>주소: {address}</h5>
    </RowFrameContainer>
    </Frame>
  );
};

const ResultContent = () => {
  const [list, setList] = useState({
    placeName: [],
    category: [],
    address: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8001/api/socket/list_com", {
          "data": {
            "group": localStorage.getItem("Code")
          }
        });
        console.log(response.data);
        setList(response.data);
      }
      catch (error) {
        console.log("에러남:", error);
      }
    }
    fetchData();
  }, []);

  const items = list.placeName.map((name, index) => ({
    name,
    category: list.category[index],
    address: list.address[index],
  }));

  return (
    <Container>
      <TopFrame>
        <h1>Result</h1>
      </TopFrame>
      <ListFrame>
        {items.map((item, index) => (
          <RowFrame
            key={index}
            name={item.name}
            category={item.category}
            address={item.address}
          />
        ))}
      </ListFrame>
    </Container>
  );
};

const Result = () => {
  return <Layout Content={<ResultContent />} />;
};

export default Result;