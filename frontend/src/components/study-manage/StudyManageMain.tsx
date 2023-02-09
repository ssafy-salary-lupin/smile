import styled from "styled-components";
import profileImg from "../../assets/img/study_manage_profile_img.jpg";
import chatImg from "../../assets/img/chat_icon.png";
import { useState } from "react";
import StudyRuleModal from "./StudyRuleModal";
import ChatModal from "./ChatModal";
import { useQuery } from "react-query";
import {
  StudyInfoSelectApi,
  StudyUserSelectApi,
} from "apis/StudyManageMainApi";
import { useRecoilState } from "recoil";
import { StudyRuleAtom } from "atoms/StudyManageMainAtom";

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
  /* &::-webkit-scrollbar {
    width: 0.417vw;
  }
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: #8b8b8b;
    border-radius: 0.694vw;
  } */
`;

const DefaultNotice = styled.p`
  text-align: center;
  width: 100%;
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
  background-color: greenyellow;
  width: 1.111vw;
  height: 1.111vw;
  border-radius: 100%;
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

const Dday = styled.div`
  width: 90%;
  height: 2.778vw;
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
  font-size: 1.111vw;
  text-align: center;
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

interface DataInfo {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    name: string; //스터디 이름
    startDate: string; //스터디 시작 일자
    endDate: string; //스터디 종료 일자
    time: string; //스터디 시간
    imgPath: string; //스터디 대표 이미지
    currrentPerson: number; //스터디 현재 가입 인원
    maxPerson: number; //스터디 최대 가입 인원
    viewCount: number; //스터디 조회수
    type: {
      id: number; //스터디 유형 식별자
      name: string; //스터디 유형 이름
    };
    comments: [
      {
        user: {
          id: number; //댓글 작성자 식별자
          imgPath: string; //프로필
          nickname: string; //댓글 작성자 닉네임
        };
        content: string; //댓글 내용
        replies: [
          //답글리스트
          {
            user: {
              id: number; //대댓글 작성자 식별자
              imgPath: string; //프로필
              nickname: string; //대댓글 작성자 닉네임
            };
            content: string; //대댓글 내용
          },
        ];
      },
    ];
  };
}

interface DataUser {
  isSuccess: boolean;
  code: number;
  message: string;
  result: [
    {
      id: number;
      nickname: string;
      email: string;
      imagePath: string;
      isLeader: boolean;
    },
  ];
}

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

  // 필요한 정보
  // 1. 프로필 사진
  // 2. 스터디명
  // 3. 스터디 유형이름 + 스터디 시간 + 스터디 시작 일자 + 스터디 종료 일자
  // => /studies/1
  const { data: studyInfo } = useQuery<DataInfo>("studyInfoSelectApi", () =>
    StudyInfoSelectApi(),
  );

  // 4. 스터디 가입 멤버 => /studies/1/users
  const { data: studyUser } = useQuery<DataUser>("studyUserSelectApi", () =>
    StudyUserSelectApi(),
  );

  const users = studyUser?.result;

  // 5. 규칙 입력 => /studies/1
  const [studyRule, setStudyRule] = useRecoilState(StudyRuleAtom);

  return (
    <Wrapper>
      <SubWrapper1>
        <StudyPropfile>
          <StudyImgWrapper>
            <StudyImg>
              <Profile src={profileImg} />
            </StudyImg>
          </StudyImgWrapper>
          <StudyName>
            <p>{studyInfo?.result.name}</p>
          </StudyName>
          <StudyInfo>
            <StudyType>{studyInfo?.result.type.name} 스터디</StudyType>
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
            <DefaultNotice>{studyRule}</DefaultNotice>
          </StudyNotice>
          <StudySub>
            <StudyMember>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberBox>
                {users?.map((el) => {
                  return (
                    <Member>
                      <Name>{el.nickname}</Name>
                      <Status></Status>
                    </Member>
                  );
                })}
              </MemberBox>
            </StudyMember>
            <Space></Space>
            <StudyDday>
              <DdayTitle>디데이</DdayTitle>
              <DdayBox>
                <Dday>
                  <Tag></Tag>
                  <Text>D-2 스터디 참여</Text>
                </Dday>
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
      {modalOpen && <StudyRuleModal setModalOpen={setModalOpen} />}
      {chatModalOpen && <ChatModal setModalOpen={setChatModalOpen} />}
    </Wrapper>
  );
}

export default StudyManageMain;
