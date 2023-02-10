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

// submenu 들어갈 자리
const SubMenu = styled.div`
  height: 11.667vw;
`;

function StudyManagePages() {
  return (
    <>
      <SubMenu>
        <StudyNavBar />
      </SubMenu>
      <Switch>
        <Route exact path="/manage">
          <StudyManageMain />
        </Route>
        <Route path="/manage/board">
          <StudyManageBoardList />
        </Route>
        <Route path="/manage/calendar">
          <StudyManageCalendar />
        </Route>
        <Route path="/manage/boardWrite">
          <StudyManageBoardWrite />
        </Route>
        <Route path="/manage/boardDetail/:boardId">
          <StudyManageBoardDetail />
        </Route>
        <Route path="/manage/boardUpdate/:boardId">
          <StudyManageBoardUpdate />
        </Route>
        <Route path="/manage/meetingRecord">
          <StudyMeetingRecord />
        </Route>
        {/* 스터디원 관리 */}
      </Switch>
    </>
  );
}

export default StudyManagePages;
