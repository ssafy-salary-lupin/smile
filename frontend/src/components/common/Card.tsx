import styled from "styled-components";
import ProfileImg from "./ProfileImg";

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
    box-shadow: 0px 0px 1.68vw #b4bbc5;
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

interface studyImgProps {
  studyInfo: {
    si_id: number;
    si_img: string;
    si_person: number;
    si_max_person: number;
    si_desc: string;
    si_view: number;
    si_leader: {
      si_leader_id: number;
      si_leader_img: string;
      si_leader_nickname: string;
    };
  };
}

function Card(props: studyImgProps) {
  const visitedTime = 1;
  const visitedCountInput = props.studyInfo.si_view;
  const visitedCount = visitedCountInput
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <SContainer>
      <SCardImg src={props.studyInfo.si_img} />
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
              {props.studyInfo.si_person}/{props.studyInfo.si_max_person}
            </span>
          </SCardInfoItem>
        </SCardInfo>
        <SCardDescription>
          <span>{props.studyInfo.si_desc}</span>
        </SCardDescription>
        <SCardUser>
          <ProfileImg
            imgUrl={props.studyInfo.si_leader.si_leader_img}
            width="3.36vw"
            height="3.36vw"
          />
          <SCardUserItem>
            <span>{props.studyInfo.si_leader.si_leader_nickname}</span>
            <span>{visitedTime} min read</span>
          </SCardUserItem>
        </SCardUser>
      </SCardItem>
    </SContainer>
  );
}

export default Card;
