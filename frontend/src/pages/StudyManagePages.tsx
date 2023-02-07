import StudyNavBar from "components/study-manage/StudyNavBar";
import ChatModal from "components/study-manage/ChatModal";
import StudyManageBoardList from "components/study-manage/StudyManageBoardList";
import { useState } from "react";
import styled from "styled-components";
import StudyManageCalendar from "../components/study-manage/StudyManageCalendar";
import StudyManageMain from "../components/study-manage/StudyManageMain";
import chatImg from "../assets/img/chat_icon.png";
import StudyManageBoardDetail from "components/study-manage/StudyManageBoardDetail";
import StudyManageBoardWrite from "components/study-manage/StudyManageBoardWrite";

// submenu 들어갈 자리
const SubMenu = styled.div`
  height: 11.667vw;
`;

const SubWrapper2 = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 2.222vw;
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

function StudyManagePages() {
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
  const showChatModal = () => {
    setChatModalOpen(!chatModalOpen);
  };

  return (
    <>
      <SubMenu>
        <StudyNavBar />
      </SubMenu>
      {/* <StudyManageMain /> */}
      {/* <StudyManageCalendar /> */}
      <StudyManageBoardList />
      {/* <StudyManageBoardDetail /> */}
      {/* <StudyManageBoardWrite /> */}
      {/* <SubWrapper2> 
        <Chat onClick={showChatModal}>
          <ChatIcon src={chatImg} />
        </Chat>
      </SubWrapper2>
      {chatModalOpen && <ChatModal setModalOpen={setChatModalOpen} />} */}
    </>
  );
}

export default StudyManagePages;
