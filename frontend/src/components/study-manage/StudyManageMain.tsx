import styled from "styled-components";
import profileImg from "../../assets/img/study_manage_profile_img.jpg";
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

const StudyType = styled.p`
  padding: 0.278vw 0;
`;
const StudyPeriod = styled(StudyType)``;
const StudyTime = styled(StudyType)``;

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
  &:active,
  &:focus {
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
  border-radius: 1.111vw;
  box-shadow: 5px 5px 5px rgb(172, 172, 172);
  padding: 2.222vw;
  font-size: 1.111vw;
  display: flex;
  align-items: center;
  cursor: pointer;
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
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 10px;
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.556vw 0.278vw;
`;

const Name = styled.div`
  width: 90%;
  font-size: 1.111vw;
`;

const Status = styled.div`
  /* background-color: greenyellow; */
  width: 1.111vw;
  height: 1.111vw;
  border-radius: 100%;
  /* 임시로 추가 */
  display: flex;
  align-items: center;
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
  height: 17.778vw;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 10px;
  }
`;

const NoDday = styled.div`
  margin: 0.556vw;
  height: 100%;
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
  border: 1px solid rgb(118, 118, 118);
  box-shadow: 2px 2px 2px rgb(169, 169, 169);
  border-radius: 0.556vw;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.556vw;
`;

const Tag = styled.div`
  background-color: #314e8d;
  border-radius: 0.556vw 0 0 0.556vw;
  width: 15%;
`;

const Text = styled.div`
  width: 85%;
  font-size: 0.972vw;
  line-height: 1.667vw;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 1.111vw;
`;

const Chat = styled.div`
  width: 3.472vw;
  height: 3.472vw;
`;

const ChatIcon = styled.img`
  width: 100%;
  &:hover,
  active,
  focus {
    cursor: pointer;
  }
`;

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

  return (
    <Wrapper>
      <SubWrapper1>
        <StudyPropfile>
          <StudyImgWrapper>
            <StudyImg>
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
          </StudyInfo>
          <QuitBtnBox>
            <QuitBtn>스터디 탈퇴</QuitBtn>
          </QuitBtnBox>
        </StudyPropfile>
        <StudyContents>
          <StudyNotice onClick={showModal}>
            {/* <DefaultNotice> */}
            <ReactQuill theme="snow" value={rule} readOnly modules={modules} />
            {/* </DefaultNotice> */}
          </StudyNotice>
          <StudySub>
            <StudyMember>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberBox>
                {studyInfo?.result.users?.map((el, index) => {
                  if (el.id === studyCeoAtom) {
                    return (
                      <Member key={index}>
                        <Name>{el.nickname} (스터디장)</Name>
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
              </MemberBox>
            </StudyMember>
            <Space></Space>
            <StudyDday>
              <DdayTitle>디데이</DdayTitle>
              <DdayBox>
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
      {modalOpen && (
        <StudyRuleModal setModalOpen={setModalOpen} createRule={createRule} />
      )}
      {chatModalOpen && <ChatModal setModalOpen={setChatModalOpen} />}
      {ddayModalOpen && (
        <ModalCalendarCommonOnlyView
          setModalOpen={setDdayModalOpen}
          scheduleId={selectedId}
        />
      )}
    </Wrapper>
  );
}

export default StudyManageMain;
