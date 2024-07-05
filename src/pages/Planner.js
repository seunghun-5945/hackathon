import React, { useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FcPlanner } from 'react-icons/fc';
import DatePicker from 'react-datepicker';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';

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

const ButtonArea = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  width: 40%;
  height: 100%;
  background-color: salmon;
  border: none;
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
  const [nickName, setNickName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(nickName);
    console.log(code);
  }, [nickName, code]);

  const makeRoom = async () => {
    const Nm = localStorage.getItem("NickName")
    const Cd = localStorage.getItem("Code")
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/socket/join', {
        data: { leader: Nm, room_num: parseInt(Cd)},
      });
      if (response.status === 200) {
        navigate("/CompletePlanner");
      }
    } catch (error) {
      alert(error);
      console.error('Failed to join group:', error);
    }
  };

  const onChangeNickName = (e) => {
    return (
      setNickName(e.target.value),
      localStorage.setItem("NickName", nickName)
    )
  }

  const onChangeCode = (e) => {
    return (
      setCode(e.target.value),
      localStorage.setItem("Code", code)
    )
  }

  return (
    <JoinModalContainer>
      <JoinModalFrame>
        <h1>Planner Alone</h1>
        <PlannerButton onClick={() => setAccess(false)}>홀로 시작 하기</PlannerButton>
        <h1>Planner Together</h1>
        <PasswordInput placeholder="닉네임을 입력하세요" onChange={onChangeNickName} />
        <PasswordInput placeholder="그룹 참가 코드를 입력하세요" onChange={onChangeCode} />
        <ButtonArea>
          <StyledButton onClick={() => setAccess(false)}>방만들기</StyledButton>
          <StyledButton onClick={makeRoom}>방참가하기</StyledButton>
        </ButtonArea>
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
  height: 60%;
  display: flex;
  background-color: white;
  border: 1px solid black;
  box-sizing: border-box;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Destination = ({ coordinates }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2fb6bdb50116c3ad9d5359e4b0eccac4&autoload=false";
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapContainer.current && coordinates) {
          const map = new window.kakao.maps.Map(mapContainer.current, {
            center: new window.kakao.maps.LatLng(coordinates.lng, coordinates.lat),
            level: 3,
          });
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(coordinates.lng, coordinates.lat),
            map: map
          });
        }
      });
    };
    document.head.appendChild(script);
  }, [coordinates]);

  return <MapContainer ref={mapContainer} />;
};

const TourAddButton = styled.button`
  @media (max-width: 768px) {
    width: 80%;
    height: 10%;
    border: 1px solid black;
  }
`;

const BottomFrame = styled(Link)`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: black;
    font-size: 20px;
    color: white;
    text-decoration: none;
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
  text-align: center;
  background-color: white;
  padding-left: 22%;
  font-size: 15px;
`;

const PlannerContent = () => {
  const [access, setAccess] = useState(true);
  const [stateCalendar, setCalendar] = useState(false);
  const [isDepartDate, setIsDepartDate] = useState(true);
  const [departDate, setDepartDate] = useState(null);
  const [arriveDate, setArriveDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const options = [
    { value: '부산', label: '부산' },
    { value: '서울', label: '서울' },
    { value: '경주', label: '경주' },
    { value: '포항', label: '포항' },
    { value: '여수', label: '여수' },
    { value: '가평', label: '가평' },
    { value: '김해', label: '김해' },
    { value: '대구', label: '대구' },
    { value: '광주', label: '광주' },
    { value: '강릉', label: '강릉' },
    { value: '인천', label: '인천' },
    { value: '전주', label: '전주' },
    { value: '대전', label: '대전' },
    { value: '거제', label: '거제' },
    { value: '제주도', label: '제주도' },
  ];

  useEffect(() => {
    console.log('DepartDate: ', departDate);
    console.log('ArriveDate: ', arriveDate);
    console.log('드롭다운 값', selectedOption);
  }, [departDate, arriveDate]);

  const handleDateChange = (date) => {
    if (isDepartDate) {
      setDepartDate(date);
    } else {
      setArriveDate(date);
    }
    setCalendar(false);
  };

  const GetXY = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/get_xy`, {
        data: {
          region: selectedOption.value,
        },
      });
      setCoordinates({ lat: response.data[0], lng: response.data[1] });
      localStorage.setItem("lat", response.data[0])
      localStorage.setItem("lng", response.data[1])
      localStorage.setItem("region", selectedOption.value)
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
    }
  };

  const CustomInput = ({ value, onClick }) => (
    <input onClick={onClick} value={value} readOnly style={{ width: '100%', height: '100%', border: 'none', fontSize: '15px', textAlign: 'center' }} />
  );

  const socketCreate = async() => {
    const leader = localStorage.getItem("NickName")
    const roomNum = parseInt(localStorage.getItem("Code"))
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/socket/ws_create', {
        data: {
          leader: leader,
          room_num: roomNum
        }
      });
  
      if (response.data.error) {
        console.error('Error:', response.data.error);
        return { error: response.data.error };
      }
  
      console.log('Room number:', response.data.number);
      return { number: response.data.number };
    } catch (error) {
      console.error('Failed to create group:', error);
      return { error: 'Failed to create group' };
    }
  }

  return (
    <Container>
      {access && <JoinModal setAccess={setAccess} />}
      {stateCalendar && (
        <DatePickerWrapper>
          <DatePicker selected={isDepartDate ? departDate : arriveDate} onChange={handleDateChange} inline />
        </DatePickerWrapper>
      )}
      <TopFrame>
        <FcPlanner />
        <h1>Planner</h1>
      </TopFrame>
      <MainFrame>
        <MainRowFrame>
          <Select
            options={options}
            placeholder="어디로 떠나 볼까요?"
            value={selectedOption}
            onChange={setSelectedOption}
            styles={{
              container: (provided) => ({
                ...provided,
                width: '85%',
                height: '100%',
              }),
              control: (provided) => ({
                ...provided,
                height: '100%',
                fontSize: '15px',
              }),
            }}
          />
          <SearchButton onClick={GetXY}>+</SearchButton>
        </MainRowFrame>
        <Destination coordinates={coordinates} />
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
              customInput={<CustomInput value={departDate ? departDate.toLocaleDateString() : '클릭하여 출발일을 선택하세요'} />}
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
              customInput={<CustomInput value={arriveDate ? arriveDate.toLocaleDateString() : '클릭하여 도착일을 선택하세요'} />}
              wrapperClassName="custom-datepicker"
            />
          </DateRowFrame>
        </DateFrame>
      </MainFrame>
      <BottomFrame to="/completePlanner" onClick={socketCreate}>플래너 생성</BottomFrame>
    </Container>
  );
};

const Planner = () => {
  return <Layout Content={<PlannerContent />} />;
};

export default Planner;
