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
function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPages />
      </Route>
      <Route path="/manage">
        <StudyManagePages />
      </Route>
      <Route path="/myStudy/:userId">
        <MyStudyPages />
      </Route>
      <Route path="/test">
        <TestPages />
      </Route>
      <Route path="/create">
        <StudyCreatePages />
      </Route>
      <Route path="/detail/:id">
        <StudyDetailPages />
      </Route>
      <Route path="/videoMeeting/:studyId/:userId">
        <VideoMeetingPages />
      </Route>
      <Route path="/kakao/redirect/:accessToken">
        <KakaoPages />
      </Route>
      <Route path="/search">
        <StudySearchPages />
      </Route>
    </Switch>
  );
}

export default Router;
