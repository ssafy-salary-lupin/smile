import styled, { keyframes } from "styled-components";
import ProfileImg from "./ProfileImg";
import defaultStudyImg from "assets/img/card_photo_1.png";
import defaultprofileImg from "assets/img/userDefaultImg.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardHover = keyframes`
  from {
    
  }
  to {
    box-shadow: 0px 0px 2vw #666b70;
  }
`;
const CardNotHover = keyframes`
  from {
    box-shadow: 0px 0px 2vw #666b70;    
  }
  to {

  }
`;

const enterDescription = keyframes`
  from {
    opacity: 0;
    z-index: -1;
  }
  to {
    opacity: 0.8;
    z-index: 100;
  }
`;

const leaveDescription = keyframes`
  from {
    opacity: 0.8;
    z-index: 100;
  }
  to {
    opacity: 0;
    z-index: -1;
  }
`;

const SContainer = styled.div`
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 29.68vw;
  height: 36.75vw;
  margin-bottom: 2.222vw;
  border: solid 1px #e6e8ec;
  box-shadow: 0px 0px 1.12vw ${(props) => props.theme.subColor};
  @media screen and (min-width: 1680px) {
    grid-template-rows: 314.496px 185.904px;
    border-radius: 16.128px;
    width: 427.392px;
    height: 529.2px;
    margin-bottom: 31.997px;
    border: solid 0.069vw #e6e8ec;
    box-shadow: 0vw 0vw 16.128px ${(props) => props.theme.subColor};
  }
  :hover {
    animation: ${CardHover} 1.5s forwards;
    #overD {
      animation: ${enterDescription} 1s forwards;
    }
  }
  :not(:hover) {
    animation: ${CardNotHover} 1.5s forwards;
    #overD {
      animation: ${leaveDescription} 1s forwards;
    }
  }
`;

const SCardItem = styled.span`
  display: grid;
  grid-template-rows: 3.92vw 4.2vw 4.62vw;
  padding: 0.7vw 1.68vw;
  @media screen and (min-width: 1680px) {
    grid-template-rows: 56.448px 60.48px 66.528px;
    padding: 10.08px 24.192px;
  }
`;
const SCardImg = styled.img`
  border-radius: 1.12vw 1.12vw 0px 0px;
  width: 29.68vw;
  height: 21.84vw;
  @media screen and (min-width: 1680px) {
    border-radius: 16.128px 16.128px 0vw 0vw;
    width: 427.392px;
    height: 314.496px;
  }
`;

const Description = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #434649;
  border-radius: 1.12vw 1.12vw 0px 0px;
  width: 29.68vw;
  height: 21.84vw;
  opacity: 0;
  z-index: -1;
  @media screen and (min-width: 1680px) {
    border-radius: 16.128px 16.128px 0vw 0vw;
    width: 427.392px;
    height: 314.496px;
  }
  span {
    padding: 2.778vw;
    font-size: 1.26vw;
    font-weight: 600;
    color: white;
    @media screen and (min-width: 1680px) {
      padding: 40.003px;
      font-size: 18.144px;
    }
  }
`;

const SCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SCardInfoItem = styled.span`
  display: flex;
  align-items: center;
  img {
    width: 1.68vw;
    height: 1.68vw;
    @media screen and (min-width: 1680px) {
      width: 24.192px;
      height: 24.192px;
    }
  }
  span {
    margin-left: 0.28vw;
    font-size: 1.12vw;
    margin-bottom: 0.2vw;
    @media screen and (min-width: 1680px) {
      margin-left: 4.032px;
      font-size: 16.128px;
      margin-bottom: 2.88px;
    }

    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    span {
      font-weight: 400;
      color: ${(props) => props.theme.textSubColor};
    }
  }
`;
const SCardDescription = styled.div`
  span {
    font-size: 1.26vw;
    @media screen and (min-width: 1680px) {
      font-size: 18.144px;
    }
  }
`;
const SCardUser = styled.div`
  display: flex;
  align-items: center;
`;
const SCardUserItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.12vw;
  height: 3.36vw;
  justify-content: space-around;
  font-weight: 500;
  @media screen and (min-width: 1680px) {
    margin-left: 16.128px;
    height: 48.384px;
  }

  span {
    font-size: 1.12vw;
    @media screen and (min-width: 1680px) {
      font-size: 16.128px;
    }
    color: ${(props) => props.theme.textColor};
    :nth-child(2) {
      color: ${(props) => props.theme.textSubColor};
      font-weight: 300;
    }
  }
`;

const curPath = window.location.pathname;
console.log("PATH : ", curPath);

interface PropsType {
  studyInfo: {
    id: number; // 스터디 식별자
    name?: string; // 스터디 이름
    imagePath: string; // 스터디 대표 이미지 주소
    description: string; // 스터디 설명
    currentPerson: number; // 현재 가입 인원
    maxPerson: number; // 최대 가입 인원
    viewCount: number; // 조회수
    lastVisitTime?: string; // 마지막 방문 시간
    lastVisitedTime?: string; // 마지막 방문 시간
    commentCount?: number;
    type?: {
      id?: number;
      name?: string;
    };
    leader: {
      // 스터디 리더
      id: number; // 스터디장 유저 식별자
      imagePath: string; // 스터디장 프로필 이미지 주소
      nickname: string; // 스터디장 닉네임
    };
    end?: boolean; // 스터디 종료 여부
  };
}

export default function Card(props: PropsType) {
  const visitedTime = 1;
  const visitedCountInput = props.studyInfo.viewCount;
  console.log("VIEW", visitedCountInput);
  console.log(props);
  const visitedCount = visitedCountInput
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const profileImgUrl = props.studyInfo.leader.imagePath;
  const studyImgUrl = props.studyInfo.imagePath;

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={{
        pathname: `/detail/${props.studyInfo.id}`, // 스터디 상세 조회 페이지 주소 입력하기
      }}
    >
      <SContainer>
        <SCardImg
          src={studyImgUrl.includes("/root") ? defaultStudyImg : studyImgUrl}
        />
        <Description id={"overD"}>
          <span>{props.studyInfo.description}</span>
        </Description>
        <SCardItem>
          <SCardInfo>
            <SCardInfoItem>
              <img src={require("../../assets/img/Door.png")} />
              <span>
                {visitedCount}
                <span>View</span>
              </span>
            </SCardInfoItem>
            <SCardInfoItem>
              <img src={require("../../assets/img/Users.png")} />
              <span>
                {props.studyInfo.currentPerson}/{props.studyInfo.maxPerson}
              </span>
            </SCardInfoItem>
          </SCardInfo>
          <SCardDescription>
            {/* <span>{props.studyInfo.description}</span> */}
            <span>{props.studyInfo.name}</span>
          </SCardDescription>
          <SCardUser>
            <ProfileImg
              imgUrl={
                profileImgUrl && profileImgUrl.includes("/root")
                  ? profileImgUrl
                  : defaultprofileImg
              }
              width="3.36vw"
              height="3.36vw"
            />
            <SCardUserItem>
              <span>{props.studyInfo.leader.nickname}</span>
              <span>{visitedTime} min read</span>
            </SCardUserItem>
          </SCardUser>
        </SCardItem>
      </SContainer>
    </Link>
  );
}
