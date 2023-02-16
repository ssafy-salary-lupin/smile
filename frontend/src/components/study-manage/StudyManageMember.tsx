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
import ModalManageMandate from "./ModalManageMandate";
import ModalManageEnd from "./ModalManageEnd";
import ModalManageDrop from "./ModalManageDrop";
import { StudyUserApi } from "../../apis/StudyManageMemberApi";
import { ReactComponent as Crown } from "../../assets/icon/Crown.svg";
import axios from "axios";
import { theme } from "theme";
import { useRecoilValue } from "recoil";
import { studyIdRecoil } from "atoms/StudyManage";

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
      imgPath: string; //사용자 프로필 사진 url
      isLeader: boolean; //스터디장 유무
    },
  ];
}

interface StudyUserType {
  id: number; //사용자 식별자
  nickname: string; //사용자 닉네임
  email: string; //사용자 이메일
  imgPath: string; //사용자 프로필 사진 url
  isLeader: boolean; //스터디장 유무
}

//
function StudyManageMember() {
  const pushFalse = (n: number) => {
    const tempArr: boolean[] = [];
    for (let i = 0; i < n; i++) {
      tempArr.push(false);
    }
    return tempArr;
  };

  // 모집 / 마감 버튼 바꾸기
  const [change, setChange] = useState(false);
  const changeColor = () => {
    setChange(change);
  };

  // 모집 모달 열기
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);
  const ReopenModal = () => {
    setRecruitModalOpen(!recruitModalOpen);
  };
  // 마감 모달 열기
  const [deadLineModalOpen, setDeadLineModalOpen] = useState(false);
  const DeopenModal = () => {
    setDeadLineModalOpen(!deadLineModalOpen);
  };
  const studyId = useRecoilValue(studyIdRecoil);
  // 스터디의 회원 정보 가져오기
  const { data: userStudy } = useQuery<Data>("userStudy", () =>
    StudyUserApi(studyId),
  );
  // const [studyUser, setStudyUser] = useState<StudyUserType[]>(studyId);

  // useEffect(() => {
  //   if (userStudy && userStudy.result) {
  //     userStudy.result.sort(function (a, b) {
  //       if (a.hasOwnProperty("isLeader")) {
  //         return a.isLeader - b.isLeader;
  //       }
  //     });
  //   }
  // }, [userStudy]);

  // 스터디장 유무 정렬
  // sort by value

  const [userInfo, setUserN] = useState<number>(0);
  useEffect(() => {
    if (userStudy) {
      setUserN(userStudy.result.length);
    }
  }, [userStudy]);

  // 위임
  const [mandateModalOpen, setMandateModalOpen] = useState(pushFalse(userInfo));
  const MandateopenModal = (idx: number) => {
    // 위임 모달
    setMandateModalOpen(
      mandateModalOpen.splice(idx, 1, !mandateModalOpen[idx]),
    );
    console.log(mandateModalOpen);
  };

  // 강퇴
  const [dropModalOpen, setDropModalOpen] = useState(pushFalse(userInfo));
  const DropopenModal = (idx: number) => {
    setDropModalOpen(dropModalOpen.splice(idx, 1, !dropModalOpen[idx]));
    console.log(dropModalOpen);
  };

  // 종료
  const [endModalOpen, setEndModalOpen] = useState(false);
  const EndopenModal = () => {
    setEndModalOpen(!endModalOpen);
  };

  return (
    <Wrapper>
      <UpContainer>
        {userStudy?.result.map((user: any, index: number) => {
          if (user.leader) {
            return (
              <Card key={index}>
                {/* <Card> */}
                <ProfileImg
                  imgUrl={
                    user?.imgPath !== "/root"
                      ? user?.imgPath
                      : defaultprofileImg
                    // defaultprofileImg
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
              </Card>
            );
          } else {
            return <></>;
          }
        })}
        {userStudy?.result.map((user: any, index: number) => {
          if (!user.leader) {
            return (
              <Card key={index}>
                {/* <Card> */}
                <ProfileImg
                  imgUrl={
                    user?.imgPath !== "/root"
                      ? user?.imgPath
                      : defaultprofileImg
                    // defaultprofileImg
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
                    <YellowBtn
                      onClick={() => {
                        MandateopenModal(index);
                      }}
                    >
                      위임
                    </YellowBtn>
                    <BlueBtn
                      onClick={() => {
                        DropopenModal(index);
                      }}
                    >
                      강퇴
                    </BlueBtn>
                  </BtnBox>
                )}
                {dropModalOpen[index] && (
                  <ModalManageDrop setModalOpen={setDropModalOpen} />
                )}
                {mandateModalOpen[index] && (
                  <ModalManageMandate setModalOpen={setMandateModalOpen} />
                )}
              </Card>
            );
          } else {
            return <></>;
          }
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
            {change !== true ? (
              <BtnYellow onClick={ReopenModal}>모집 시작</BtnYellow>
            ) : (
              <BtnBlue onClick={DeopenModal}>모집 마감</BtnBlue>
            )}
          </Box>
          <Box>
            <TextBox>
              <BigText>스터디 종료</BigText>
              <Text>한번 종료하면 되돌릴 수 없습니다.</Text>
              <Text>삭제하시겠습니까?</Text>
            </TextBox>
            {endModalOpen && <ModalManageEnd setModalOpen={setEndModalOpen} />}
            <BtnWhite onClick={EndopenModal}>스터디 종료하기</BtnWhite>
          </Box>
        </RedBox>
        {recruitModalOpen && (
          <ModalManageRecruit1
            setModalOpen={setRecruitModalOpen}
            setChange={setChange}
          />
        )}
        {deadLineModalOpen && (
          <ModalManageDeadline
            setModalOpen={setDeadLineModalOpen}
            setChange={setChange}
          />
        )}
      </DownContainer>
    </Wrapper>
  );
}

export default StudyManageMember;
