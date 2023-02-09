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

const SLandingBody = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
  font-family: "Noto Sans", sans-serif;
  /* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif; */
`;

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 35vw 50.4vw 59.36vw 59.36vw;
  /* grid-template-rows: 44.8vw 50.4vw 59.36vw 59.36vw; */
  /* grid-template-rows: 640px 720px 848px 848px; */
`;
const SBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* justify-content: center; */
  margin-left: 5.04vw;
  /* margin-left: 72px; */
  * {
    margin: 1.12vw 0px;
  }
`;
const SStudyList = styled.div`
  padding: 8.4vw 1.12vw;
  /* padding: 8.4vw 5.6vw; */
`;

const SItemTitle = styled.span`
  padding: 0vw 5.6vw;
  font-size: 2.52vw;
  font-weight: 600;
`;

const SBannerItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 2.52vw;
    /* font-size: 36px; */
    :nth-child(2) {
      font-weight: 600;
      font-size: 3.36vw;
      margin-top: 1.68vw;
      /* font-size: 48px;
      margin-top: 24px; */
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
  /* width: 240px;
  height: 72px; */
  /* border-radius: 16px; */
  border-radius: 1.12vw;
  background-color: black;
  color: white;
  /* font-size: 24px; */
  font-size: 1.68vw;
  :hover {
    animation: ${Hover} 1s forwards;
  }
  :not(:hover) {
    animation: ${NotHover} 1s forwards;
  }
`;

const SCards = styled.div`
  display: flex;
  justify-content: space-around;

  margin-top: 2.8vw;
`;

const SArrow = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 0.84vw;
    height: 2.03vw;
    /* width: 12px;
    height: 29px; */
  }
`;

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

const SIntroductionItem = styled.div<SIntroductionItemTextProps>`
  display: flex;
  align-items: center;
  padding: 0vw 3.6vw;
  /* padding: 96px; */

  img {
    width: 44.8vw;
    height: 52.22vw;
    border-radius: 1.12vw;
    position: absolute;
    z-index: -1;
    ${(props) => (props.direction === "L" ? "left: -50vw;" : "right: -50vw")};
    animation: ${(props) =>
        props.top <= 900
          ? props.direction === "L"
            ? slideLeft
            : slideRight
          : props.direction === "L"
          ? slideLeftReverse
          : slideRightReverse}
      2s forwards ease-in;
  }
  div {
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
  }
`;

const SIntroductionItemImg = styled.img``;

interface SIntroductionItemTextProps {
  direction: string;
  top: number;
}

const SIntroductionItemText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: -1;
  /* right: 3.6vw; */
  width: 44.8vw;
  padding-left: 2.5vw;
`;

const STextBold = styled.span`
  font-size: 3vw;
  /* font-size: 48px; */
  font-weight: 600;
  margin-bottom: 1.12vw;
`;
const SText = styled.span`
  font-size: 2.24vw;
  /* font-size: 32px; */
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
  const studyList = [
    {
      studyId: 1,
      imageUrl: studyImg1,
      person: 4,
      maxPerson: 5,
      description: "다 같이 열심히 공부해요~",
      views: 2729,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      studyLeader: {
        userId: 1,
        profileImageUrl: profileImg1,
        nickname: "이싸피",
      },
    },
    {
      studyId: 2,
      imageUrl: studyImg2,
      person: 3,
      maxPerson: 5,
      description: "매일 같이 공부하실분!!",
      views: 1234,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      studyLeader: {
        userId: 2,
        profileImageUrl: profileImg2,
        nickname: "김싸피",
      },
    },
    {
      studyId: 3,
      imageUrl: studyImg3,
      person: 2,
      maxPerson: 4,
      description: "싸피 면접 스터디 같이하시죠!",
      views: 3529,
      lastVisitTime: "2023-02-02T05:15:34", //최근 방문 시간.
      studyLeader: {
        userId: 3,
        profileImageUrl: profileImg3,
        nickname: "박대전",
      },
    },
  ];

  return (
    <>
      <BackgroundYellow bgHeight="65vw" />
      <SLandingBody>
        <SContainer>
          <SBanner>
            <SBannerItem>
              <span>{bannerText}</span>
              <span>{bannerSubText}</span>
            </SBannerItem>
            <SBannerButton>
              <span>{bannerButtonText}</span>
            </SBannerButton>
          </SBanner>
          <SStudyList>
            <SItemTitle>현재 인기있는 스터디</SItemTitle>
            <SCards>
              <SArrow>
                <img src={arrowL} alt="" />
              </SArrow>
              {studyList.map((study) => (
                <Card key={study.studyId} studyInfo={study} />
              ))}
              <SArrow>
                <img src={arrowR} alt="" />
              </SArrow>
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
              <STextBold>당신의 스터디를 찾아보세요!</STextBold>
              <SText>어떤 스터디를 원하세요?</SText>
            </SIntroductionItemText>
            <SIntroductionItemImg src={introductionImg2} id="item2" />
          </SIntroductionItem>
        </SContainer>
      </SLandingBody>
    </>
  );
}

export default LandingPages;
