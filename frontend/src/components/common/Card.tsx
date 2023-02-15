import styled, { keyframes } from "styled-components";
import ProfileImg from "./ProfileImg";
import defaultStudyImg from "assets/img/card_photo_1.png";
import defaultprofileImg from "assets/img/userDefaultImg.png";

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

  @media screen and (min-width: 1280px) {
    grid-template-rows: 209.664px 123.936px;
    border-radius: 10.752px;
    width: 284.928px;
    height: 352.8px;
    margin-bottom: 21.331px;
    border: solid 0.104vw #e6e8ec;
    box-shadow: 0vw 0vw 10.752px ${(props) => props.theme.subColor};
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

  @media screen and (min-width: 1280px) {
    grid-template-rows: 37.632px 40.32px 44.352px;
    padding: 6.72px 16.128px;
  }
`;
const SCardImg = styled.img`
  border-radius: 1.12vw 1.12vw 0px 0px;
  width: 29.68vw;
  height: 21.84vw;

  @media screen and (min-width: 1280px) {
    border-radius: 10.752px 10.752px 0vw 0vw;
    width: 284.928px;
    height: 209.664px;
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

  @media screen and (min-width: 1280px) {
    border-radius: 10.752px 10.752px 0vw 0vw;
    width: 284.928px;
    height: 209.664px;
  }
  span {
    padding: 2.778vw;
    font-size: 1.26vw;
    font-weight: 600;
    color: white;
    @media screen and (min-width: 1280px) {
      padding: 26.669px;
      font-size: 12.096px;
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

    @media screen and (min-width: 1280px) {
      width: 16.128px;
      height: 16.128px;
    }
  }
  span {
    margin-left: 0.28vw;
    font-size: 1.12vw;
    margin-bottom: 0.2vw;

    @media screen and (min-width: 1280px) {
      margin-left: 2.688px;
      font-size: 10.752px;
      margin-bottom: 1.92px;
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
    @media screen and (min-width: 1280px) {
      font-size: 12.096px;
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
  @media screen and (min-width: 1280px) {
    margin-left: 10.752px;
    height: 32.256px;
  }

  span {
    font-size: 1.12vw;
    @media screen and (min-width: 1280px) {
      font-size: 10.752px;
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
  const visitedCount = visitedCountInput
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const profileImgUrl = props.studyInfo.leader.imagePath;
  const studyImgUrl = props.studyInfo.imagePath;

  const formatter = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  const passedTime = (date: string) => {
    const start: any = new Date(date);
    const end: any = new Date(); // 현재 날짜

    const diff = (end - start) / 1000; // 경과 시간

    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];

    // 년 단위부터 알맞는 단위 찾기
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);

      // 큰 단위는 0보다 작은 소수 단위 나옴
      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }

    // 모든 단위가 맞지 않을 시
    return "방금 전";
  };

  return (
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
            imgUrl={profileImgUrl ? profileImgUrl : defaultprofileImg}
            width="32.256px"
            height="32.256px"
          />
          <SCardUserItem>
            <span>{props.studyInfo.leader.nickname}</span>
            <span>
              {props.studyInfo.lastVisitTime
                ? passedTime(props.studyInfo.lastVisitTime)
                : props.studyInfo.lastVisitedTime
                ? passedTime(props.studyInfo.lastVisitedTime)
                : "방금 전"}
            </span>
          </SCardUserItem>
        </SCardUser>
      </SCardItem>
    </SContainer>
  );
}
