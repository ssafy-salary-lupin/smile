import styled, { keyframes } from "styled-components";
import ProfileImg from "./ProfileImg";
import defaultStudyImg from "assets/img/card_photo_1.png";
import defaultprofileImg from "assets/img/userDefaultImg.png";
import { Link } from "react-router-dom";

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

const SContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans", sans-serif;
  font-family: "Noto Sans KR", sans-serif;
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 29.68vw;
  height: 36.75vw;
  /* grid-template-rows: 312px 213px;
  border-radius: 16px;
  width: 424px;
  height: 525px; */
  border: solid 1px #e6e8ec;
  box-shadow: 0px 0px 1.12vw ${(props) => props.theme.subColor};
  /* box-shadow: 0px 0px 16px ${(props) => props.theme.subColor}; */
  :hover {
    /* box-shadow: 0px 0px 24px #b4bbc5; */
    /* box-shadow: 0px 0px 1.68vw #b4bbc5; */
    animation: ${CardHover} 1.5s forwards;
  }
  :not(:hover) {
    animation: ${CardNotHover} 1.5s forwards;
  }
`;

const SCardItem = styled.span`
  display: grid;
  grid-template-rows: 3.92vw 4.2vw 4.62vw;
  padding: 0.7vw 1.68vw;
  /* grid-template-rows: 54px 60px 66px;
  padding: 10px 24px; */
`;
const SCardImg = styled.img`
  border-radius: 1.12vw 1.12vw 0px 0px;
  width: 29.68vw;
  height: 21.84vw;
  /* border-radius: 16px 16px 0px 0px;
  width: 424px;
  height: 312px; */
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
    /* width:24px;
    height:24px; */
  }
  span {
    /* padding-top: 0.175vw; */
    margin-left: 0.28vw;
    font-size: 1.12vw;
    /* padding-top: 2.5px;
    margin-left: 4px;
    font-size: 16px; */
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
  }
  /* font-size: 18px; */
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
  /* margin-left: 16px;
  height: 48px; */
  justify-content: space-around;
  font-weight: 500;

  span {
    font-size: 1.12vw;
    /* font-size: 16px; */
    color: ${(props) => props.theme.textColor};
    :nth-child(2) {
      color: ${(props) => props.theme.textSubColor};
      font-weight: 300;
    }
  }
`;

const curPath = window.location.pathname;
console.log("PATH : ", curPath);

// interface studyProps {}

// if (curPath === "/") {
//   interface PropsType {
//     studyInfo: {
//       id: number;
//       imagePath: string;
//       currentPerson: number;
//       maxPerson: number;
//       description: string;
//       viewCount: number;
//       lastVisitTime: string;
//       leader: {
//         id: number;
//         imagePath: string;
//         nickname: string;
//       };
//     };
//   }
// } else if (curPath.includes("/myStudy")) {

// }
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
  const visitedCount = visitedCountInput
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const profileImgUrl = props.studyInfo.leader.imagePath;
  const studyImgUrl = props.studyInfo.imagePath;

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={{
        pathname: `/studyDetail/${props.studyInfo.id}`, // 스터디 상세 조회 페이지 주소 입력하기
      }}
    >
      <SContainer>
        <SCardImg
          src={studyImgUrl.includes("/root") ? defaultStudyImg : studyImgUrl}
        />
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
            <span>{props.studyInfo.description}</span>
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
