import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import StudyManagePages from "./pages/StudyManagePages";
import StudyCreatePages from "./pages/StudyCreatePages";
import TestPages from "./pages/TestPages";
import WaitingPages from "./pages/WaitingPages";
import MyStudyPages from "./pages/MyStudyPages";
import KakaoPages from "./pages/KakaoPages";
import StudyDetailPages from "./pages/StudyDetailPages";
import StudySearchPages from "pages/StudySearchPages";
import VideoMeetingPages from "pages/VideoMeetingPages";
import ChatComponent from "components/study-manage/ChatModalTest";
import StudyChatComponent from "components/study-manage/ChatModalTest";
import LoginPages from "pages/LoginPages";
function Router() {
  return (
    <Switch>
      {/* 랜딩 페이지 */}
      <Route exact path="/">
        <LandingPages />
      </Route>
      {/* 스터디 관리 페이지 => studyId가 param으로 추가 */}
      {/* <Route path="/manage">
        <StudyManagePages />
      </Route> */}
      <Route path="/manage/:studyId">
        <StudyManagePages />
      </Route>
      {/* 내 스터디 페이지 */}
      <Route path="/myStudy/:userId">
        <MyStudyPages />
      </Route>
      {/* 스터디 생성 페이지 */}
      <Route path="/create">
        <StudyCreatePages />
      </Route>
      {/* 스터디 상세 조회 페이지 */}
      <Route path="/detail/:id">
        <StudyDetailPages />
      </Route>
      {/* 화상회의 입장 */}
      <Route path="/meeting/:studyId/:userId">
        <VideoMeetingPages />
      </Route>
      {/* 카카오 로그인 redirect위한 페이지 */}
      <Route path="/kakao/redirect/:accessToken">
        <KakaoPages />
      </Route>
      {/* 스터디 찾기 페이지 */}
      <Route path="/search">
        <StudySearchPages />
      </Route>
      {/* 실시간 채팅 test */}
      <Route path="/chat">
        <StudyChatComponent />
      </Route>
      {/* test */}
      {/* <Route path="/test">
        <TestPages />
      </Route> */}
      <Route path="/Login">
        <LoginPages />
      </Route>
    </Switch>
  );
}

export default Router;
