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
import { Route, Switch } from "react-router-dom";
import StudyManageBoardUpdate from "components/study-manage/StudyManageBoardUpdate";
import StudyMeetingRecord from "components/study-manage/StudyMeetingRecord";
import StudyManageMember from "components/study-manage/StudyManageMember";
import NavBarSub from "components/common/NavBarSub";
import Footer from "components/common/Footer";

// submenu 들어갈 자리
const SubMenu = styled.div`
  height: 11.667vw;
  /* background-color: #e7ecff; */
`;

function StudyManagePages() {
  const curPath = window.location.pathname;
  return (
    <>
      <NavBarSub curUrl={curPath} />
      <SubMenu>
        <StudyNavBar />
      </SubMenu>
      <Switch>
        {/* TODO채팅 테스트용 임시 루트 => 나중에 원상복귀 예정 */}
        {/* <Route exact path="/manage/1">
          <StudyManageMain />
        </Route> */}
        <Route exact path="/manage/:studyId">
          <StudyManageMain />
        </Route>
        <Route path="/manage/board/:studyId">
          <StudyManageBoardList />
        </Route>
        <Route path="/manage/board/:studyId">
          <StudyManageBoardList />
        </Route>
        <Route path="/manage/calendar/:studyId">
          <StudyManageCalendar />
        </Route>
        <Route path="/manage/boardWrite/:studyId">
          <StudyManageBoardWrite />
        </Route>
        <Route path="/manage/boardDetail/:boardId">
          <StudyManageBoardDetail />
        </Route>
        <Route path="/manage/boardUpdate/:boardId">
          <StudyManageBoardUpdate />
        </Route>
        <Route path="/manage/meetingRecord/:studyId">
          <StudyMeetingRecord />
        </Route>
        <Route path="/manage/manageMember/:studyId">
          <StudyManageMember />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default StudyManagePages;
