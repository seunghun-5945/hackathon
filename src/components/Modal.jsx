import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
  z-index: 500; 
`;

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  border-bottom: 2px solid #efefef;
`;

const Main = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #efefef;
`;

const Footer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7c98fc;
  border-radius: 0 0 20px 20px;
  cursor: pointer;
  color: white;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #7c98fc;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const Modal = ({ closeModal }) => {
  const navigate = useNavigate(); // 최상위 레벨에서 useNavigate 사용
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleButtonClick = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ longitude, latitude });
              setError(null);
              console.log(latitude);
              console.log(longitude);
              navigate("/restaurant", { state: { longitude, latitude } });
            },
            (error) => {
              setError(error.message);
              setLocation(null);
            },
            {
              enableHighAccuracy: true,
              timeout: 27000,
              maximumAge: 30000,
            }
          );
        } else {
          setError('권한이 거부되었습니다.');
        }
      }).catch((error) => {
        console.error('Permission query failed:', error);
      });
    } else {
      setError('Geolocation API가 지원되지 않습니다.');
    }
  };
  

  return (
    <Container>
      <Header>위치설정</Header>
      <Main>
        <StyledButton onClick={handleButtonClick}>자동설정</StyledButton>
      </Main>
      <Footer onClick={closeModal}>
        <h4>닫기</h4>
      </Footer>
    </Container>
  );
};

export default Modal;
