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
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
  }
`;

const TopFrame = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 25% 0 25%;
  background-color: white;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const ListFrame = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('your-image-url.jpg'); /* 배경 이미지 URL */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-size: cover; /* 화면 전체를 덮게 조절 */
  background-position: center center; /* 이미지가 화면의 중앙에 위치하도록 조절 */
`;

const RowFrame = styled.div`
  width: 100%;
  height: 10%;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ResultContent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8001/api/socket/list_com", {
          "data": {
            "group": localStorage.getItem("Code")
          }
        });
        console.log(response.data);
        const processedList = response.data.map(item => item.split(',')); // ','를 구분자로 사용
        console.log(processedList);
        setList(processedList);
      }
      catch (error) {
        console.log("에러남:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <TopFrame>
        <StyledImage src="data:image/png;base64,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" />
        <h1>Result</h1>
      </TopFrame>
      <ListFrame>
        {list.length > 0 ? (
          list.map((item, index) => (
            <RowFrame key={index}>
              {/* Assuming item is an array; adjust rendering as necessary */}
              <h1 style={{width:"100%", borderBottom:"1px solid black"}}>{item.join(', ')}</h1>
            </RowFrame>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </ListFrame>
    </Container>
  );
};

const Result = () => {
  return <Layout Content={<ResultContent />} />;
};

export default Result;
