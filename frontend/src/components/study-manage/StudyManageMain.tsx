import styled from "styled-components";
import profileImg from "../../assets/img/study_manage_profile_img.jpg";
import chatImg from "../../assets/img/chat_icon.png";

const Wrapper = styled.div`
  margin: 0 10.833vw;
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

const StudyType = styled.p``;
const StudyPeriod = styled.p``;
const StudyTime = styled.p``;

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
  active,
  focus {
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
  border-radius: 1.667vw;
  box-shadow: 5px 5px 5px rgb(172, 172, 172);
  padding: 2.222vw;
  font-size: 1.111vw;
  display: flex;
  align-items: center;
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
    background-color: #314e8d76;
    border-radius: 10px;
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.278vw;
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
    background-color: #314e8d76;
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

function StudyManageMain() {
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
            <p>SSAFY 스터디</p>
          </StudyName>
          <StudyInfo>
            <StudyType>면접 스터디</StudyType>
            <StudyPeriod>2022.07.06 ~ 23.05.30</StudyPeriod>
            <StudyTime>pm 7:00 ~ pm 8:00</StudyTime>
          </StudyInfo>
          <QuitBtnBox>
            <QuitBtn>스터디 탈퇴</QuitBtn>
          </QuitBtnBox>
        </StudyPropfile>
        <StudyContents>
          <StudyNotice>
            <DefaultNotice>
              스터디 규칙을 작성을 위해 CLICK해주세요.
            </DefaultNotice>
          </StudyNotice>
          <StudySub>
            <StudyMember>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberBox>
                <Member>
                  <Name>스터디원 1</Name>
                  <Status></Status>
                </Member>
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
        <Chat>
          <ChatIcon src={chatImg} />
        </Chat>
      </SubWrapper2>
    </Wrapper>
  );
}

export default StudyManageMain;
