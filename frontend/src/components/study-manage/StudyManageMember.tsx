import styled from "styled-components";
// import ProfileImg from "../components/common/ProfileImg";
import ProfileImg from "../common/ProfileImg";
import defaultprofileImg from "assets/img/userDefaultImg.png";
import chatImg from "../../assets/img/chat_icon.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Button1 from "../common/ButtonBasic";
import ModalManageRecruit1 from "./ModalManageRecruit";
import ModalManageDeadline from "./ModalManageDeadline";
import ModalManageEnd from "./ModalManageEnd";
import ModalManageDrop from "./ModalManageDrop";
import {
  StudyUserApi,
  MandateApi,
  UserDropApi,
  StudyEndApi,
} from "../../apis/StudyManageMemberApi";
import { ReactComponent as Crown } from "../../assets/icon/Crown.svg";
import axios from "axios";
import { theme } from "theme";

import ModalManageRecruit from "./ModalManageRecruit";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.blackColor};
  }
`;

const UpContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 22.153vw);
  /* margin-top: 2.8vw; */
  margin-bottom: 2.222vw;
  /* @media screen and (min-width: 1680px) {
    margin-top: 40.32px;
  } */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.12vw;
  width: 21.667vw;
  height: 24.861vw;
  margin-bottom: 2.222vw;
  margin: 0px 20px;
  border: solid 1px #e6e8ec;
  box-shadow: 0 5px 5px -5px ${(props) => props.theme.subColor};
  /* box-shadow: 5px 5px 5px 5px gray; */
`;

const NickBox = styled.div`
  display: flex;
`;

const Nick = styled.div`
  padding-top: 10px;
  margin-bottom: 2.222vw;
`;

const BtnBox = styled.div``;

const BlueBtn = styled.button`
  cursor: pointer;
  box-shadow: 0 5px 5px -5px #333;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: x-small;
  background-color: ${(props) => props.theme.pointColor};
  border: ${(props) => props.theme.pointColor};
  color: white;
  margin-left: 10px;
`;

const YellowBtn = styled.button`
  cursor: pointer;
  box-shadow: 0 5px 5px -5px #333;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: x-small;
  border: ${(props) => props.theme.pointColor};
  background-color: ${(props) => props.theme.mainColor};
`;

const DownContainer = styled.div``;

const RedBox = styled.div`
  height: 200px;
  width: 700px;
  border: solid 1px Red;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-starat;
  justify-content: space-between;
  padding: 10px;
`;

const TextBox = styled.div`
  height: 90px;
`;
const BigText = styled.div`
  font-weight: bold;
  font-size: large;
  padding: 10px;
`;

const Text = styled.div`
  font-size: small;
`;

const BtnYellow = styled.button`
  cursor: pointer;
  border: ${(props) => props.theme.mainColor} 1px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-size: small;
  background-color: ${(props) => props.theme.mainColor};
  box-shadow: 0 5px 5px -5px #333;
`;
const BtnBlue = styled.button`
  cursor: pointer;
  border: ${(props) => props.theme.pointColor} 1px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-size: small;
  background-color: ${(props) => props.theme.pointColor};
  box-shadow: 0 5px 5px -5px #333;
`;
const BtnWhite = styled.button`
  cursor: pointer;
  border: 0.5px ${(props) => props.theme.subColor};
  width: 150px;
  height: 30px;
  border-radius: 5px;
  font-size: small;
  background-color: #bcbbbb;
  box-shadow: 0 5px 5px -5px #333;
  color: red;
`;

interface Data {
  result: [
    {
      id: number; //사용자 식별자
      nickname: string; //사용자 닉네임
      email: string; //사용자 이메일
      imagePath: string; //사용자 프로필 사진 url
      isLeader: boolean; //스터디장 유무
    },
  ];
}

//
function StudyManageMember() {
  // 모집 / 마감 버튼 바꾸기
  const [change, setChange] = useState(false);
  const changeColor = () => {
    setChange(false);
  };

  // 모집 모달 열기
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);
  const openModal = () => {
    setRecruitModalOpen(!recruitModalOpen);
  };
  // 중단 모달 열기

  // // const { id } = useParams<Params>();
  // 스터디의 회원 정보 가져오기
  const { data: userStudy } = useQuery<Data>("userStudy", () => StudyUserApi());

  // 위임

  // 강퇴

  // 마감

  // 종료

  return (
    <Wrapper>
      <UpContainer>
        {userStudy?.result.map((user: any, index: any) => {
          return (
            <Card key={index}>
              {/* <Card> */}
              <ProfileImg
                imgUrl={
                  // detailStudy?.result.imgPath !== "/root"
                  //   ? detailStudy?.result.imgPath
                  // : defaultprofileImg
                  defaultprofileImg
                }
                width="50px"
                height="50px"
              />
              <NickBox>
                <Nick>{user.nickname}</Nick>
                {user.leader === true ? (
                  <Crown fill={theme.mainColor} width="1.389vw" />
                ) : null}
              </NickBox>
              <hr />
              {user.leader === true ? null : (
                <BtnBox>
                  <YellowBtn>위임</YellowBtn>
                  <BlueBtn>강퇴</BlueBtn>
                </BtnBox>
              )}
            </Card>
          );
        })}
      </UpContainer>
      <DownContainer>
        <RedBox>
          <Box>
            <TextBox>
              <BigText>스터디원 모집</BigText>
              <Text>스터디원 모집 여부를 설정할 수 있습니다.</Text>
              <Text>설정하시겠습니까?</Text>
            </TextBox>
            {recruitModalOpen && (
              <ModalManageRecruit1
                setModalOpen={setRecruitModalOpen}
                change={change}
                changeColor={changeColor}
              />
            )}
            <BtnYellow onClick={openModal}>모집 시작</BtnYellow>
            {change && <BtnBlue onClick={openModal}>모집 마감</BtnBlue>}
          </Box>
          <Box>
            <TextBox>
              <BigText>스터디 종료</BigText>
              <Text>한번 종료하면 되돌릴 수 없습니다.</Text>
              <Text>삭제하시겠습니까?</Text>
            </TextBox>
            <BtnWhite>스터디 종료하기</BtnWhite>
          </Box>
        </RedBox>
      </DownContainer>
    </Wrapper>
  );
}

export default StudyManageMember;
