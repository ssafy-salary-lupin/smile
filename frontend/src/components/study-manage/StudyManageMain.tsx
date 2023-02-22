import styled from "styled-components";
import profileImg from "../../assets/img/study_manage_profile_img.jpg";
<<<<<<< HEAD
import chatImg from "../../assets/img/chat_icon.png";
import { useState } from "react";
import StudyRuleModal from "./StudyRuleModal";
import ChatModal from "./ChatModal";
=======

import chatImg from "../../assets/img/chat_icon.png";
import { useEffect, useState } from "react";
import StudyRuleModal from "./StudyRuleModal";
import ChatModal from "./ChatModal";
import { useQuery } from "react-query";
import {
  DdaySelectApi,
  ruleCreateApi,
  StudyInfoSelectApi,
  StudyUserApi,
} from "apis/StudyManageMainApi";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import ModalCalendarCommonOnlyView from "./ModalCalendarCommonOnlyView";
import { useRecoilState, useRecoilValue } from "recoil";
import { StudyCeoRecoil, studyIdRecoil } from "atoms/StudyManage";
import { ReactComponent as Crown } from "../../assets/icon/Crown.svg";
import { theme } from "theme";
import { UserIdState } from "atoms/UserInfoAtom";
import Swal from "sweetalert2";
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const Wrapper = styled.div`
  margin: 3.889vw 10.833vw;
  display: flex;
  flex-direction: column;
`;

const SubWrapper1 = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubWrapper2 = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 2.222vw;
`;

const StudyPropfile = styled.div`
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 0 2.222vw;
`;

const StudyImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StudyImg = styled.div`
  width: 11.111vw;
  height: 11.111vw;
  border-radius: 70%;
  overflow: hidden;
  margin: 2.222vw;
`;

const Profile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StudyName = styled.div`
  text-align: center;
  font-size: 1.667vw;
  font-weight: 700;
`;

const StudyInfo = styled.div`
  text-align: center;
  color: rgb(121, 121, 121);
  font-size: 1.111vw;
  margin-top: 1.111vw;
  margin-bottom: 16.667vw;
  p {
    margin: 0;
  }
`;

<<<<<<< HEAD
const StudyType = styled.p``;
const StudyPeriod = styled.p``;
const StudyTime = styled.p``;
=======
const StudyType = styled.p`
  padding: 0.278vw 0;
`;
const StudyPeriod = styled(StudyType)``;
const StudyTime = styled(StudyType)``;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

const QuitBtnBox = styled.div`
  text-align: center;
`;

const QuitBtn = styled.button`
  background-color: transparent;
  border: none;
  color: rgb(191, 191, 191);
  text-decoration: underline;
  font-size: 0.972vw;
  &:hover,
<<<<<<< HEAD
  active,
  focus {
=======
  &:active,
  &:focus {
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    cursor: pointer;
  }
`;

const StudyContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.222vw;
`;

const StudyNotice = styled.div`
  background-color: #f2f3e6;
  width: 50vw;
  height: 13.889vw;
<<<<<<< HEAD
  border-radius: 1.667vw;
=======
  border-radius: 1.111vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  box-shadow: 5px 5px 5px rgb(172, 172, 172);
  padding: 2.222vw;
  font-size: 1.111vw;
  display: flex;
  align-items: center;
  cursor: pointer;
<<<<<<< HEAD
`;

const DefaultNotice = styled.p`
  text-align: center;
  width: 100%;
=======
  overflow-y: scroll;
  .quill {
    width: 100%;
    text-align: center;
    font-size: 0.972vw;
  }

  .ql-container.ql-snow {
    border: none;
    background-color: transparent;
    font-size: 0.972vw;
    text-align: center;
  }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const StudySub = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3.889vw;
  padding: 0 1.111vw;
`;

const StudyMember = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const MemberTitle = styled.div`
  text-align: left;
  font-size: 1.667vw;
  font-weight: 700;
  padding: 1.111vw 0.556vw;
  border-bottom: 0.069vw solid black;
  margin-bottom: 1.667vw;
`;

const MemberBox = styled.div`
  overflow-y: scroll;
  height: 13.333vw;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
<<<<<<< HEAD
    background-color: #314e8d76;
=======
    background-color: ${(props) => props.theme.pointColor};
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    border-radius: 10px;
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
<<<<<<< HEAD
  padding: 0.278vw;
=======
  padding: 0.556vw 0.278vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const Name = styled.div`
  width: 90%;
  font-size: 1.111vw;
`;

const Status = styled.div`
<<<<<<< HEAD
  background-color: greenyellow;
  width: 1.111vw;
  height: 1.111vw;
  border-radius: 100%;
=======
  /* background-color: greenyellow; */
  width: 1.111vw;
  height: 1.111vw;
  border-radius: 100%;
  /* 임시로 추가 */
  display: flex;
  align-items: center;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const Space = styled.div`
  width: 20%;
`;

const StudyDday = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const DdayTitle = styled.div`
  text-align: left;
  font-size: 1.667vw;
  font-weight: 700;
  padding: 1.111vw 0.556vw;
`;

const DdayBox = styled.div`
  overflow-y: scroll;
<<<<<<< HEAD
  height: 13.333vw;
=======
  height: 17.778vw;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
<<<<<<< HEAD
    background-color: #314e8d76;
=======
    background-color: ${(props) => props.theme.pointColor};
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    border-radius: 10px;
  }
`;

<<<<<<< HEAD
const Dday = styled.div`
  width: 90%;
  height: 2.778vw;
=======
const NoDday = styled.div`
  margin: 0.556vw;
  height: 80%;
  background-color: ${(props) => props.theme.subColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.139vw solid black;
  border-bottom: 0.139vw solid black;

  p {
    margin: 0;
    font-size: 1.111vw;
  }
`;

const Dday = styled.div`
  cursor: pointer;
  width: 90%;
  min-height: 2.778vw;
  height: auto;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  border: 1px solid rgb(118, 118, 118);
  box-shadow: 2px 2px 2px rgb(169, 169, 169);
  border-radius: 0.556vw;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.556vw;
`;

const Tag = styled.div`
<<<<<<< HEAD
=======
  /* background-color: #f7faff; */
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  background-color: #314e8d;
  border-radius: 0.556vw 0 0 0.556vw;
  width: 15%;
`;

const Text = styled.div`
  width: 85%;
<<<<<<< HEAD
  font-size: 1.111vw;
  text-align: center;
=======
  font-size: 0.972vw;
  line-height: 1.667vw;
  text-align: left;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  display: flex;
  align-items: center;
  padding: 0 1.111vw;
`;

const Chat = styled.div`
  width: 3.472vw;
  height: 3.472vw;
<<<<<<< HEAD
=======
  position: relative;
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
`;

const ChatIcon = styled.img`
  width: 100%;
  &:hover,
  active,
  focus {
    cursor: pointer;
  }
`;

<<<<<<< HEAD
function StudyManageMain() {
  // 스터디 룰 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const showChatModal = () => {
    console.log("채팅");
    setChatModalOpen(!chatModalOpen);
  };
=======
export interface DataInfo {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    imagePath: string;
    name: string; // 스터디 이름
    description: string; // 스터디 설명
    startDate: string; // 스터디 생성날짜
    endDate: string; // 스터디 종료날짜
    time: string; // 스터디 하는 시간.
    rule: string; // 스터디 규칙
    users: [
      {
        id: number;
        nickname: string;
      },
    ];
  };
}

interface DdayInfo {
  isSuccess: boolean;
  code: number;
  message: string;
  result: [
    {
      id: number;
      day: number;
      title: string;
    },
  ];
}

interface IUserInfo {
  code: number;
  isSuccess: boolean;
  message: string;
  result: [
    {
      email: string;
      id: number;
      imgPath: string;
      leader: boolean;
      nickname: string;
    },
  ];
}

interface IStudyId {
  studyId: string;
}

function StudyManageMain() {
  // studyId param값 가져오기
  const params = useParams<IStudyId>();
  const studyId = params.studyId;
  // studyId recoil 변수에 저장
  const [studyIdAtom, setStudyIdAtom] = useRecoilState(studyIdRecoil);
  const [studyCeoAtom, setStudyCeoAtom] = useRecoilState(StudyCeoRecoil);

  const userId = useRecoilValue(UserIdState);
  // 스터디 룰 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showModal = () => {
    if (userId !== studyCeoAtom) {
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "스터디장만 입력가능합니다!!",
      });
    } else {
      setModalOpen(true);
    }
  };

  //채팅 모달창 띄우기
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
  const showChatModal = () => {
    setChatModalOpen(!chatModalOpen);
  };

  // 필요한 정보
  // 1. 프로필 사진
  // 2. 스터디명
  // 3. 스터디 유형이름 + 스터디 시간 + 스터디 시작 일자 + 스터디 종료 일자
  // 4. 스터디 가입 멤버
  const { data: studyInfo, refetch } = useQuery<DataInfo | undefined>(
    "studyInfoSelectApi",
    () => StudyInfoSelectApi(studyId),
  );

  const { data: ddayInfo } = useQuery<DdayInfo>("ddaySelectApi", () =>
    DdaySelectApi(studyId),
  );

  const { data: userInfo } = useQuery<IUserInfo>("userInfoApi", () =>
    StudyUserApi(studyId),
  );

  // const { data: chatInfo } = useQuery("chatSelectAllApi", () =>
  //   ChatSelectAllApi(studyId),
  // );

  const [nickName, setNickName] = useState("");

  // 채팅 닉네임
  useEffect(() => {
    userInfo?.result.forEach(async (element) => {
      if (element.id === userId) {
        await setNickName(element.nickname);
      }
    });
  }, [userInfo]);

  // 디데이 모달창 띄우기 + 클릭한 아이디 모달창에 넘겨주기
  const [ddayModalOpen, setDdayModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const showDdayModal = (id: any) => {
    setSelectedId(id);
    setDdayModalOpen(true);
  };

  // quill
  const modules = {
    toolbar: false,
  };

  // 규칙 생성
  const createRule = (formData: any) => {
    ruleCreateApi(formData, studyId);
    refetch();
    window.location.replace("/manage/" + studyId);
  };

  // 스터디 정보 갱신
  const [rule, setRule] = useState<string>();
  useEffect(() => {
    setStudyIdAtom(studyId);
    setRule(studyInfo?.result.rule);

    userInfo?.result.map(async (el: any) => {
      if (el.leader) {
        await setStudyCeoAtom(el.id);
      }
    });
  }, [studyInfo, userInfo]);

>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
  return (
    <Wrapper>
      <SubWrapper1>
        <StudyPropfile>
          <StudyImgWrapper>
            <StudyImg>
<<<<<<< HEAD
              <Profile src={profileImg} />
            </StudyImg>
          </StudyImgWrapper>
          <StudyName>
            <p>SSAFY 스터디</p>
          </StudyName>
          <StudyInfo>
            <StudyType>면접 스터디</StudyType>
            <StudyPeriod>2022.07.06 ~ 23.05.30</StudyPeriod>
            <StudyTime>pm 7:00 ~ pm 8:00</StudyTime>
=======
              <Profile src={studyInfo?.result.imagePath} />
            </StudyImg>
          </StudyImgWrapper>
          <StudyName>
            <p>{studyInfo?.result.name}</p>
          </StudyName>
          <StudyInfo>
            <StudyPeriod>
              {studyInfo?.result.startDate} ~ {studyInfo?.result.endDate}
            </StudyPeriod>
            <StudyTime>{studyInfo?.result.time}</StudyTime>
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
          </StudyInfo>
          <QuitBtnBox>
            <QuitBtn>스터디 탈퇴</QuitBtn>
          </QuitBtnBox>
        </StudyPropfile>
        <StudyContents>
          <StudyNotice onClick={showModal}>
<<<<<<< HEAD
            <DefaultNotice>
              스터디 규칙을 작성을 위해 CLICK해주세요.
            </DefaultNotice>
=======
            {/* <DefaultNotice> */}
            <ReactQuill theme="snow" value={rule} readOnly modules={modules} />
            {/* </DefaultNotice> */}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
          </StudyNotice>
          <StudySub>
            <StudyMember>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberBox>
<<<<<<< HEAD
                <Member>
                  <Name>스터디원 1</Name>
                  <Status></Status>
                </Member>
=======
                {studyInfo?.result.users?.map((el, index) => {
                  if (el.id === studyCeoAtom) {
                    return (
                      <Member key={index}>
                        <Name>{el.nickname}</Name>
                        <Status>
                          <Crown fill={theme.mainColor} width="100%" />
                        </Status>
                      </Member>
                    );
                  } else {
                    return (
                      <Member key={index}>
                        <Name>{el.nickname}</Name>
                        <Status></Status>
                      </Member>
                    );
                  }
                })}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
              </MemberBox>
            </StudyMember>
            <Space></Space>
            <StudyDday>
              <DdayTitle>디데이</DdayTitle>
              <DdayBox>
<<<<<<< HEAD
                <Dday>
                  <Tag></Tag>
                  <Text>D-2 스터디 참여</Text>
                </Dday>
=======
                {ddayInfo !== undefined && ddayInfo?.result.length > 0 ? (
                  ddayInfo.result.map((el, index) => {
                    return (
                      <Dday key={index} onClick={() => showDdayModal(el.id)}>
                        <Tag></Tag>
                        <Text>
                          D-{el.day} {el.title}
                        </Text>
                      </Dday>
                    );
                  })
                ) : (
                  <NoDday>
                    <p>앞으로의 일정이 없습니다.</p>
                  </NoDday>
                )}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
              </DdayBox>
            </StudyDday>
          </StudySub>
        </StudyContents>
      </SubWrapper1>
      <SubWrapper2>
        <Chat onClick={showChatModal}>
          <ChatIcon src={chatImg} />
        </Chat>
      </SubWrapper2>
<<<<<<< HEAD
      {modalOpen && <StudyRuleModal setModalOpen={setModalOpen} />}
      {chatModalOpen && <ChatModal setModalOpen={setChatModalOpen} />}
=======
      {modalOpen && (
        <StudyRuleModal setModalOpen={setModalOpen} createRule={createRule} />
      )}
      {chatModalOpen && (
        <ChatModal
          setModalOpen={setChatModalOpen}
          nickName={nickName}
          // chatInfo={chatInfo.result}
        />
      )}
      {ddayModalOpen && (
        <ModalCalendarCommonOnlyView
          setModalOpen={setDdayModalOpen}
          scheduleId={selectedId}
        />
      )}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
    </Wrapper>
  );
}

export default StudyManageMain;
