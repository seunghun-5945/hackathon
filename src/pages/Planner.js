import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FcPlanner } from "react-icons/fc";
import DatePicker from "react-datepicker";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 92dvh;
    position: relative;
    background-color: white;
  }
`;

const JoinModalContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 92vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: purple;
  }
`;

const JoinModalFrame = styled.div`
  @media (max-width: 768px) {
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    color: black;
  }
`;

const PlannerButton = styled.button`
  @media (max-width: 768px) {
    width: 80%;
    height: 10%;
    background-color: salmon;
    font-size: 20px;
    cursor: pointer;
    color: white;
  }
`;

const PasswordInput = styled.input`
  width: 80%;
  height: 10%;
  border: 1px solid black;
  font-size: 15px;
  padding: 2%;
`;

const JoinModal = ({ setAccess }) => {
  return (
    <JoinModalContainer>
      <JoinModalFrame>
        <h1>Planner Alone</h1>
        <PlannerButton onClick={() => setAccess(false)}>홀로 시작 하기</PlannerButton>
        <h1>Planner Together</h1>
        <PasswordInput placeholder="닉네임을 입력하세요" />
        <PasswordInput placeholder="그룹 참가 코드를 입력하세요" />
        <PlannerButton>함께 시작 하기</PlannerButton>
      </JoinModalFrame>
    </JoinModalContainer>
  );
};

const TopFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    font-size: 40px;
    h1 {
      font-size: 30px;
    }
  }
`;

const MainFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid black;
    position: relative;
  }
`;

const MainRowFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }
`;

const DateFrame = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const DateRowFrame = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: black;
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 85%;
  height: 100%;
  border: none;
  border-radius: 0px;
  padding: 2%;
  font-size: 15px;
`;

const SearchButton = styled.button`
  width: 15%;
  height: 100%;
  border: none;
  background-color: lightsalmon;
  font-size: 30px;
  color: black;
`;

const DestinationContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  background-color: white;
  border: 1px solid black;
  box-sizing: border-box;
`;

const ImageFrame = styled.div`
  width: 40%;
  height: 100%;
  border-right: 1px solid black;
`;

const Destination = () => {
  return (
    <DestinationContainer>
      <ImageFrame>여행지 이미지가 들어갑니다</ImageFrame>
    </DestinationContainer>
  );
};

const TourAddButton = styled.button`
  @media (max-width: 768px) {
    width: 80%;
    height: 10%;
    border: 1px solid black;
  }
`;

const ChatButton = styled.div`
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 1px solid black;
    border-radius: 50%; 
    margin: 4%;
  }
`;

const BottomFrame = styled.button`
  @media (max-width: 768px) {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: black;
    font-size: 20px;
    color: white;
  }
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const CustomDatePicker = styled(DatePicker)`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid black;
  padding: 2%;
  font-size: 15px;
  box-sizing: border-box;
`;

const PlannerContent = () => {
  const [access, setAccess] = useState(true);
  const [stateCalendar, setCalendar] = useState(false);
  const [isDepartDate, setIsDepartDate] = useState(true);
  const [departDate, setDepartDate] = useState(null);
  const [arriveDate, setArriveDate] = useState(null);

  useEffect(() => {
    console.log("DepartDate: ", departDate);
    console.log("ArriveDate: ", arriveDate);
  }, [departDate, arriveDate]);

  const handleDateChange = (date) => {
    if (isDepartDate) {
      setDepartDate(date);
    } else {
      setArriveDate(date);
    }
    setCalendar(false);
  };

  const CustomInput = ({ value, onClick }) => (
    <SearchInput onClick={onClick} value={value} readOnly />
  );

  return (
    <Container>
      {access && <JoinModal setAccess={setAccess} />}
      {stateCalendar && (
        <DatePickerWrapper>
          <DatePicker
            selected={isDepartDate ? departDate : arriveDate}
            onChange={handleDateChange}
            inline
          />
        </DatePickerWrapper>
      )}
      <TopFrame>
        <FcPlanner />
        <h1>Planner</h1>
      </TopFrame>
      <MainFrame>
        <MainRowFrame>
          <SearchInput placeholder="어디로 떠나 볼까요?" />
          <SearchButton>+</SearchButton>
        </MainRowFrame>
        <Destination />
        <MainRowFrame>
          <h2>여행 날짜가 어떻게 되시나요?</h2>
        </MainRowFrame>
        <DateFrame>
          <DateRowFrame>
            <span>
              <FaPlaneDeparture />
              출발일:
            </span>
            <CustomDatePicker
              selected={departDate}
              onChange={(date) => {
                setDepartDate(date);
              }}
              customInput={<CustomInput value={departDate ? departDate.toLocaleDateString() : "클릭하여 출발일을 선택하세요"} />}
              wrapperClassName="custom-datepicker"
            />
          </DateRowFrame>
          <DateRowFrame>
            <span>
              <FaHome />
              도착일:
            </span>
            <CustomDatePicker
              selected={arriveDate}
              onChange={(date) => {
                setArriveDate(date);
              }}
              customInput={<CustomInput value={arriveDate ? arriveDate.toLocaleDateString() : "클릭하여 도착일을 선택하세요"} />}
              wrapperClassName="custom-datepicker"
            />
          </DateRowFrame>
        </DateFrame>
        <ChatButton><IoChatbubbleEllipsesSharp /></ChatButton>
      </MainFrame>
      <BottomFrame>플래너 생성</BottomFrame>
    </Container>
  );
};

const Planner = () => {
  return <Layout Content={<PlannerContent />} />;
};

export default Planner;
