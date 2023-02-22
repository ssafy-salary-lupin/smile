import styled, { keyframes } from "styled-components";
import Card from "../components/common/Card";
<<<<<<< HEAD
import { BackgroundYellow } from "components/common/BackgroundYellow";
=======
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD

// const Nav = styled.div`
//   height: 80px;
//   border: solid 1px black;
// `;

// const Footer = styled.div`
//   height: 240px;
//   border: solid 1px black;
//   background-color: black;
// `;
// interface IHeaderProps {
//   nbPosition: number;
//   isActive: boolean;
// }

// const SHeader = styled.div<{ nbPosition: number }>`
//   nav {
//     /* background-color: #ffffff00; */
//     /* box-shadow: 0 5px 5px rgb(0 0 0 / 0%); */
//     background-color: ${(props) => {
//       if (props.nbPosition === 0) {
//       }
//     }};
//     /* box-shadow: 0 5px 5px rgb(0 0 0 / 0%); */
//   }
// `;
=======
import { BackgroundYellow } from "components/common/BackgroundYellow";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import jwt_decode from "jwt-decode";
import { LoginAlert } from "components/common/LoginAlert";
import Footer from "components/common/Footer";
import NavBarMain from "components/common/NavBarMain";
import { PageState } from "atoms/PageAtom";

const Wrapper = styled.div``;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const SLandingBody = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
  font-family: "Noto Sans", sans-serif;
<<<<<<< HEAD
  /* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif; */
`;
// const SBackground = styled.div`
//   position: absolute;
//   z-index: -1;
//   background-image: linear-gradient(
//     to bottom,
//     ${(props) => props.theme.mainColor},
//     white
//   );
//   height: 40vw;
//   width: 100vw;
// `;
=======
  @media screen and (min-width: 1280px) {
  }
`;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 35vw 50.4vw 59.36vw 59.36vw;
<<<<<<< HEAD
  /* grid-template-rows: 44.8vw 50.4vw 59.36vw 59.36vw; */
  /* grid-template-rows: 640px 720px 848px 848px; */
=======

  @media screen and (min-width: 1280px) {
    grid-template-rows: 336px 483.84px 569.856px 569.856px;
    justify-content: center;
    width: 960px;
    margin: auto;
    grid-template-columns: 960px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;
const SBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
<<<<<<< HEAD
  /* justify-content: center; */
  margin-left: 5.04vw;
  /* margin-left: 72px; */
  * {
    margin: 1.12vw 0px;
=======
  margin-left: 5.04vw;
  @media screen and (min-width: 1280px) {
    margin-left: 48px;
  }

  * {
    margin: 1.12vw 0px;
    @media screen and (min-width: 1280px) {
      margin: 10.752px 0vw;
    }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  }
`;
const SStudyList = styled.div`
  padding: 8.4vw 1.12vw;
<<<<<<< HEAD
  /* padding: 8.4vw 5.6vw; */
=======
  @media screen and (min-width: 1280px) {
    padding: 80.64px 0px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const SItemTitle = styled.span`
  padding: 0vw 5.6vw;
  font-size: 2.52vw;
  font-weight: 600;
<<<<<<< HEAD
=======
  @media screen and (min-width: 1280px) {
    padding: 0px 53.76px;
    font-size: 24.192px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const SBannerItem = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 2.52vw;
<<<<<<< HEAD
    /* font-size: 36px; */
=======
    @media screen and (min-width: 1280px) {
      font-size: 24px;
    }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    :nth-child(2) {
      font-weight: 600;
      font-size: 3.36vw;
      margin-top: 1.68vw;
<<<<<<< HEAD
      /* font-size: 48px;
      margin-top: 24px; */
=======
      @media screen and (min-width: 1280px) {
        font-size: 32.256px;
        margin-top: 16.128px;
      }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    }
  }
`;

const Hover = keyframes`
  from {
    
  }
  to {
<<<<<<< HEAD
    box-shadow: 0px 0px 2vw #666b70;
=======
    box-shadow: 0px 0px 1vw #666b70;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  }
`;

const NotHover = keyframes`
  from {
<<<<<<< HEAD
    box-shadow: 0px 0px 2vw #666b70;
=======
    box-shadow: 0px 0px 1vw #666b70;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  }
  to {
    
  }
`;

const SBannerButton = styled.button`
  width: 16.7vw;
  height: 5.04vw;
<<<<<<< HEAD
  /* width: 240px;
  height: 72px; */
  /* border-radius: 16px; */
  border-radius: 1.12vw;
  background-color: black;
  color: white;
  /* font-size: 24px; */
  font-size: 1.68vw;
=======
  border-radius: 1.12vw;
  background-color: rgb(125, 118, 103);
  border: none;
  color: white;
  font-size: 1.68vw;
  cursor: pointer;
  @media screen and (min-width: 1280px) {
    width: 160.32px;
    height: 48.384px;
    border-radius: 10.752px;
    font-size: 16.128px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  :hover {
    animation: ${Hover} 1s forwards;
  }
  :not(:hover) {
    animation: ${NotHover} 1s forwards;
  }
<<<<<<< HEAD
=======
  :active {
    /* box-shadow: 0px 0px 1vw #666b70; */
    box-shadow: 1.997px 1.997px 4.666px 0.662px #666b70 inset;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const SCards = styled.div`
  display: flex;
  justify-content: space-around;

  margin-top: 2.8vw;
<<<<<<< HEAD
=======
  @media screen and (min-width: 1280px) {
    margin-top: 26.88px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const SArrow = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 0.84vw;
    height: 2.03vw;
<<<<<<< HEAD
    /* width: 12px;
    height: 29px; */
  }
`;

const slideLeft = keyframes`
  from {
    left: -50vw;
=======
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
  
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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

<<<<<<< HEAD
=======
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

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
const slideLeftReverse = keyframes`
  from {
    left: 3.6vw;
    opacity: 1;
  }
  to {
    left: -50vw;
<<<<<<< HEAD
=======
  
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    opacity: 0;
  }
`;

const slideRightReverse = keyframes`
  from {
    right: 3.6vw;
<<<<<<< HEAD
=======

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    opacity: 1;
  }
  to {
    right: -50vw;
<<<<<<< HEAD
=======

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
    
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    opacity: 0;
  }
`;

const SIntroductionItem = styled.div<SIntroductionItemTextProps>`
  display: flex;
  align-items: center;
  padding: 0vw 3.6vw;
<<<<<<< HEAD
  /* padding: 96px; */

  img {
    width: 44.8vw;
    height: 52.22vw;
    border-radius: 1.12vw;
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    position: absolute;
    z-index: -1;
    ${(props) => (props.direction === "L" ? "left: -50vw;" : "right: -50vw")};
    animation: ${(props) =>
<<<<<<< HEAD
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
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
  }
`;

const SIntroductionItemImg = styled.img``;
=======

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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

interface SIntroductionItemTextProps {
  direction: string;
  top: number;
}

const SIntroductionItemText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: -1;
<<<<<<< HEAD
  /* right: 3.6vw; */
  width: 44.8vw;
  padding-left: 2.5vw;
=======
  width: 44.8vw;
  padding-left: 2.5vw;
  @media screen and (min-width: 1280px) {
    width: 430.08px;
    padding-left: 24px;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const STextBold = styled.span`
  font-size: 3vw;
<<<<<<< HEAD
  /* font-size: 48px; */
  font-weight: 600;
  margin-bottom: 1.12vw;
`;
const SText = styled.span`
  font-size: 2.24vw;
  /* font-size: 32px; */
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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

<<<<<<< HEAD
=======
  const [pageState, setPageState] = useRecoilState(PageState);

  useEffect(() => {
    setPageState(window.location.pathname);
  }, [pageState]);

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
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
<<<<<<< HEAD
  const studyList = [
    {
      si_id: 1,
      si_img: studyImg1,
      si_person: 4,
      si_max_person: 5,
      si_desc: "다 같이 열심히 공부해요~",
      si_view: 2729,
      si_leader: {
        si_leader_id: 1,
        si_leader_img: profileImg1,
        si_leader_nickname: "이싸피",
      },
    },
    {
      si_id: 2,
      si_img: studyImg2,
      si_person: 3,
      si_max_person: 5,
      si_desc: "매일 같이 공부하실분!!",
      si_view: 1234,
      si_leader: {
        si_leader_id: 2,
        si_leader_img: profileImg2,
        si_leader_nickname: "김싸피",
      },
    },
    {
      si_id: 3,
      si_img: studyImg3,
      si_person: 2,
      si_max_person: 4,
      si_desc: "싸피 면접 스터디 같이하시죠!",
      si_view: 3529,
      si_leader: {
        si_leader_id: 3,
        si_leader_img: profileImg3,
        si_leader_nickname: "박대전",
=======

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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
      },
    },
  ];

<<<<<<< HEAD
  return (
    <>
      <BackgroundYellow />
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
                <Card key={study.si_id} studyInfo={study} />
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
=======
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
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    </>
  );
}

export default LandingPages;
