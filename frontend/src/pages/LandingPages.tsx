import styled, { keyframes } from "styled-components";
import Card from "../components/common/Card";
import studyImg1 from "../assets/img/card_photo_1.png";
import studyImg2 from "../assets/img/card_photo_2.png";
import studyImg3 from "../assets/img/card_photo_3.png";
import profileImg1 from "../assets/img/userDefaultImg.png";
import profileImg2 from "../assets/img/profile_img2.png";
import profileImg3 from "../assets/img/profile_img3.png";
import arrowL from "../assets/img/arrow_left.png";
import arrowR from "../assets/img/arrow_right.png";
import introductionImg1 from "../assets/img/introduction_img1.png";
import introductionImg2 from "../assets/img/introduction_img2.png";
import { useEffect, useState } from "react";
import { BackgroundYellow } from "components/common/BackgroundYellow";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import jwt_decode from "jwt-decode";
import { LoginAlert } from "components/common/LoginAlert";
import Footer from "components/common/Footer";
import NavBarMain from "components/common/NavBarMain";

const Wrapper = styled.div``;

const SLandingBody = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
  font-family: "Noto Sans", sans-serif;
  @media screen and (min-width: 1280px) {
  }
`;

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 35vw 50.4vw 59.36vw 59.36vw;

  @media screen and (min-width: 1280px) {
    grid-template-rows: 336px 483.84px 569.856px 569.856px;
    justify-content: center;
    width: 960px;
    margin: auto;
    grid-template-columns: 960px;
  }
`;
const SBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 5.04vw;
  @media screen and (min-width: 1280px) {
    margin-left: 48px;
  }

  * {
    margin: 1.12vw 0px;
    @media screen and (min-width: 1280px) {
      margin: 10.752px 0vw;
    }
  }
`;
const SStudyList = styled.div`
  padding: 8.4vw 1.12vw;
  @media screen and (min-width: 1280px) {
    padding: 80.64px 0px;
  }
`;

const SItemTitle = styled.span`
  padding: 0vw 5.6vw;
  font-size: 2.52vw;
  font-weight: 600;
  @media screen and (min-width: 1280px) {
    padding: 0px 53.76px;
    font-size: 24.192px;
  }
`;

const SBannerItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 2.52vw;
    @media screen and (min-width: 1280px) {
      font-size: 24px;
    }
    :nth-child(2) {
      font-weight: 600;
      font-size: 3.36vw;
      margin-top: 1.68vw;
      @media screen and (min-width: 1280px) {
        font-size: 32.256px;
        margin-top: 16.128px;
      }
    }
  }
`;

const Hover = keyframes`
  from {
    
  }
  to {
    box-shadow: 0px 0px 2vw #666b70;
  }
`;

const NotHover = keyframes`
  from {
    box-shadow: 0px 0px 2vw #666b70;
  }
  to {
    
  }
`;

const SBannerButton = styled.button`
  width: 16.7vw;
  height: 5.04vw;
  border-radius: 1.12vw;
  background-color: black;
  color: white;
  font-size: 1.68vw;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    width: 160.32px;
    height: 48.384px;
    border-radius: 10.752px;
    font-size: 16.128px;
  }
  :hover {
    animation: ${Hover} 1s forwards;
  }
  :not(:hover) {
    animation: ${NotHover} 1s forwards;
  }
  :active {
    /* box-shadow: 0px 0px 1vw #666b70; */
    box-shadow: 1.997px 1.997px 4.666px 0.662px #666b70 inset;
  }
`;

const SCards = styled.div`
  display: flex;
  justify-content: space-around;

  margin-top: 2.8vw;
  @media screen and (min-width: 1280px) {
    margin-top: 26.88px;
  }
`;

const SArrow = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 0.84vw;
    height: 2.03vw;
    @media screen and (min-width: 1280px) {
      width: 7.997px;
      height: 19.334px;
    }
  }
`;
// TODO : 화면 크기 조절 시 새로고침을 안하면 넓이를 모르는 버그
const W = window.innerWidth / 2;
const slideLeft = keyframes`
  from {
    left: -50vw;
  
    opacity: 0;
  }
  to {
    left: 3.6vw;
    opacity: 1;
  }
`;

const slideRight = keyframes`
  from {
    right: -50vw;
    opacity: 0;
  }
  to {
    right: 3.6vw;
    opacity: 1;
  }
`;

const mediaSlideLeft = keyframes`
  from {
    left: -50vw;
    
    opacity: 0;
  }
  to {
    left: ${W - 464}px;
    opacity: 1;
  }
  `;

const mediaSlideRight = keyframes`
    from {
      right: -50vw;
      opacity: 0;
    }
    to {
      right: ${W - 464}px;
      opacity: 1;
    }
  `;

const slideLeftReverse = keyframes`
  from {
    left: 3.6vw;
    opacity: 1;
  }
  to {
    left: -50vw;
  
    opacity: 0;
  }
`;

const slideRightReverse = keyframes`
  from {
    right: 3.6vw;

    opacity: 1;
  }
  to {
    right: -50vw;

    opacity: 0;
  }
`;

const mediaSlideLeftReverse = keyframes`
  0% {
    left: ${W - 464}px;
  }
  25%{
    opacity: 0;
  }
  100% {
    left: -50vw;
  
    opacity: 0;
  }
`;

const mediaSlideRightReverse = keyframes`
  0% {
    right: ${W - 464}px;

  }
  25%{
    opacity: 0;
  }
  100% {
    right: -50vw;

    opacity: 0;
  }
`;

const imgOpacity = keyframes`
  from {
    
    opacity: 1;
  }
  to {
    
    opacity: 0;
  }
`;

const SIntroductionItem = styled.div<SIntroductionItemTextProps>`
  display: flex;
  align-items: center;
  padding: 0vw 3.6vw;
  @media screen and (min-width: 1280px) {
    padding: 64.003px;
  }

  img {
    opacity: 1;
    width: 44.8vw;
    height: 52.22vw;
    border-radius: 1.12vw;
    @media screen and (min-width: 1280px) {
      width: 430.08px;
      height: 501.312px;
      border-radius: 10.752px;
    }
    position: absolute;
    z-index: -1;
    ${(props) => (props.direction === "L" ? "left: -50vw;" : "right: -50vw")};
    animation: ${(props) =>
        props.top !== 0
          ? props.top <= 900
            ? props.direction === "L"
              ? slideLeft
              : slideRight
            : props.direction === "L"
            ? slideLeftReverse
            : slideRightReverse
          : imgOpacity}
      2s forwards ease-in;

    @media screen and (min-width: 1280px) {
      animation: ${(props) =>
          props.top !== 0
            ? props.top <= 900
              ? props.direction === "L"
                ? mediaSlideLeft
                : mediaSlideRight
              : props.direction === "L"
              ? mediaSlideLeftReverse
              : mediaSlideRightReverse
            : imgOpacity}
        2s forwards ease-in;
    }
  }
  div {
    opacity: 1;
    ${(props) => (props.direction === "L" ? "right: 3.6vw;" : "left: 3.6vw")};
    animation: ${(props) =>
        props.top <= 900
          ? props.direction === "L"
            ? slideRight
            : slideLeft
          : props.direction === "L"
          ? slideRightReverse
          : slideLeftReverse}
      2s forwards ease-out;

    @media screen and (min-width: 1280px) {
      animation: ${(props) =>
          props.top !== 0
            ? props.top <= 900
              ? props.direction === "L"
                ? mediaSlideRight
                : mediaSlideLeft
              : props.direction === "L"
              ? mediaSlideRightReverse
              : mediaSlideLeftReverse
            : imgOpacity}
        2s forwards ease-in;
    }
  }
`;

const SIntroductionItemImg = styled.img`
  width: 44.444vw;
  height: 51.667vw;
  @media screen and (min-width: 1280px) {
    width: 480px;
    height: 558px;
  }
`;

interface SIntroductionItemTextProps {
  direction: string;
  top: number;
}

const SIntroductionItemText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: -1;
  width: 44.8vw;
  padding-left: 2.5vw;
  @media screen and (min-width: 1280px) {
    width: 430.08px;
    padding-left: 24px;
  }
`;

const STextBold = styled.span`
  font-size: 3vw;
  font-weight: 600;
  margin-bottom: 1.12vw;
  @media screen and (min-width: 1280px) {
    font-size: 31.997px;
    margin-bottom: 10.752px;
  }
`;
const SText = styled.span`
  font-size: 2.24vw;
  @media screen and (min-width: 1280px) {
    font-size: 21.331px;
  }
`;

const LinkBtn = styled(Link)`
  width: 16.7vw;
  @media screen and (min-width: 1280px) {
    width: 160.32px;
  }
`;

function LandingPages() {
  const bannerText = "어떤 스터디를 원하세요?";
  const bannerSubText = "당신의 스터디를 찾아보세요!";
  const bannerButtonText = "스터디 찾기";
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }
  const [windowWidth, setWindowWidth] = useState(0);
  function onWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onWidth);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.addEventListener("width", onWidth);
    };
  }, []);
  const target1 = document.getElementById("item1")!; // 요소의 id 값이 target이라 가정
  const clientRect1 = target1?.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
  const relativeTop1 = clientRect1?.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
  const target2 = document.getElementById("item2")!; // 요소의 id 값이 target이라 가정
  const clientRect2 = target2?.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
  const relativeTop2 = clientRect2?.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
  // console.log("divTop", relativeTop1);
  // let windowWidth = window.innerWidth;
  // console.log("width:", windowWidth);
  // console.log("Y:", position);

  const goLogin = () => {
    LoginAlert();
  };

  const studyList = [
    {
      id: 1,
      name: "SSAFY 스터디",
      imagePath: studyImg1,
      currentPerson: 4,
      maxPerson: 5,
      description: "다 같이 열심히 공부해요~",
      viewCount: 2729,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      leader: {
        id: 1,
        imagePath: profileImg1,
        nickname: "이싸피",
      },
    },
    {
      id: 2,
      name: "SSAFY 스터디",
      imagePath: studyImg2,
      currentPerson: 3,
      maxPerson: 5,
      description: "매일 같이 공부하실분!!",
      viewCount: 1234,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      leader: {
        id: 2,
        imagePath: profileImg2,
        nickname: "김싸피",
      },
    },
    {
      id: 3,
      name: "SSAFY 스터디",
      imagePath: studyImg3,
      currentPerson: 2,
      maxPerson: 4,
      description: "싸피 면접 스터디 같이하시죠!",
      viewCount: 3529,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      leader: {
        id: 3,
        imagePath: profileImg3,
        nickname: "박대전",
      },
    },
  ];

  const curPath = window.location.pathname;
  return (
    <>
      <NavBarMain curUrl={curPath} />
      <Wrapper>
        <BackgroundYellow bgHeight={65} />
        <SLandingBody>
          <SContainer>
            <SBanner>
              <SBannerItem>
                <span>{bannerText}</span>
                <span>{bannerSubText}</span>
              </SBannerItem>
              <LinkBtn to={{ pathname: `/search` }}>
                <SBannerButton>
                  <span>{bannerButtonText}</span>
                </SBannerButton>
              </LinkBtn>
            </SBanner>
            <SStudyList>
              <SItemTitle>현재 인기있는 스터디</SItemTitle>
              <SCards>
                {/* <SArrow>
                <img src={arrowL} alt="" />
              </SArrow> */}
                {studyList.map((study) => (
                  <div onClick={goLogin} key={study.id}>
                    <Card studyInfo={study} />
                  </div>
                ))}

                {/* <SArrow>
                <img src={arrowR} alt="" />
              </SArrow> */}
              </SCards>
            </SStudyList>
            <SIntroductionItem direction="L" top={relativeTop1}>
              <SIntroductionItemImg src={introductionImg1} id="item1" />
              <SIntroductionItemText>
                <STextBold>당신의 스터디를 찾아보세요!</STextBold>
                <SText>어떤 스터디를 원하세요?</SText>
              </SIntroductionItemText>
            </SIntroductionItem>
            <SIntroductionItem direction="R" top={relativeTop2}>
              <SIntroductionItemText>
                <STextBold>당신만의 스터디를 만들 수 있어요!</STextBold>
                <SText>어떤 스터디를 만들고 싶나요?</SText>
              </SIntroductionItemText>
              <SIntroductionItemImg src={introductionImg2} id="item2" />
            </SIntroductionItem>
          </SContainer>
        </SLandingBody>
      </Wrapper>
      <Footer />
    </>
  );
}

export default LandingPages;
