import React, { useState } from "react";
import styled, { css } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Layout from "../components/Layout";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #eeeeee;
    overflow-y: scroll;
    color: red;
  }
`;

const Frame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 92dvh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #d3d3d3;
    color: white;
  }
`;

const FirstpageFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("../images/handSmartPhone.jpg");
    background-size: cover;
    background-position: center;
    color: black;

    span {
      bottom: 0;
    }
  }
`;

const FirstPage = () => (
  <Frame>
    <FirstpageFrame>
      <h2>MANUALE</h2>
      <h3>사용 가이드</h3>
      <h1>----------</h1>
      <span>ANYWHERE</span>
    </FirstpageFrame>
  </Frame>
);

const SecondPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step1. 먼저 GetStar 버튼 <br /> 혹은 사이드의 메뉴의 <br/> '지도로 탐색' 을 클릭합니다.
    </h3>
    <img src="../images/secondPage.png" alt="Second Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);


const ThirdPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step2. 위치 접근을 허용 해 주시고 <br /> 지도가 뜨는 것 을 확인 해줍니다.
    </h3>
    <img src="../images/.png" alt="Second Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const FourthPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step3. 왼쪽 상단의 모달 아이콘을 클릭하면 <br/> 모달창이 열립니다.
    </h3>
    <img src="../images/thirdPage.png" alt="thirdPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const FifthPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step4. 빨간 박스 안의 항목을 선택하여 <br/> 지도 유형을 변경합니다.
    </h3>
    <img src="../images/fourthPage.png" alt="fourthPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const SixthPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step5. 빨간 박스 안의 토글 버튼을 선택하여 <br/> 지도에 표시할 항목을 키고 끕니다.
    </h3>
    <img src="../images/fifthPage.png" alt="fifthPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const SeventhPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step6. 지도에 마커가 추가 된 것을 확인합니다.
    </h3>
    <img src="../images/seventhPage.png" alt="SeventhPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const EightPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step7. 마커를 클릭하면 <br/> 장소에 대한 정보가 표시됩니다.
    </h3>
    <img src="../images/eightPage.png" alt="eightPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const NinthPage = () => (
  <Frame>
    <h3 style={{color: "black", textAlign: "center"}}>
      Step8. 끝으로 마이크 아이콘을 누른채 <br/> 질문을 하면 음성으로 답변을 해 줍니다.
    </h3>
    <img src="../images/ninthPage.png" alt="ninthPage Page" style={{ width: "80%", height: "80%" }} />
  </Frame>
);

const PageTransition = styled.div`
  width: 100%;
  height: 100%;

  &.page-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  &.page-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  &.page-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.page-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 300ms, transform 300ms;
  }
`;

const GuideContent = () => {
  const pages = [<FirstPage />, <SecondPage />, <ThirdPage />, <FourthPage />, <FifthPage />, 
  <SixthPage />, <SeventhPage />, <EightPage />, <NinthPage />];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleTouch = () => {
    setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  return (
    <Container onClick={handleTouch}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={currentPageIndex}
          classNames="page"
          timeout={300}
        >
          <PageTransition>
            {pages[currentPageIndex]}
          </PageTransition>
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};

const Guide = () => {
  return <Layout Content={<GuideContent />} />;
};

export default Guide;
