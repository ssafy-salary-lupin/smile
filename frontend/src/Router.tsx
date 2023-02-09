import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import StudyManagePages from "./pages/StudyManagePages";
import StudyCreatePages from "./pages/StudyCreatePages";
import TestPages from "./pages/TestPages";
import WaitingPages from "./pages/WaitingPages";
<<<<<<< HEAD
import MyStudyPages from "./pages/MyStudyPages";
import KakaoPages from "./pages/KakaoPages";
import StudyDetailPages from "./pages/StudyDetailPages";

=======
import MyStudyPages from "pages/MyStudyPages";
import KakaoPages from "pages/KakaoPages";
import StudySearchPages from "pages/StudySearchPages";
import VideoMeetingPages from "pages/VideoMeetingPages";
>>>>>>> b3b067a308f9a31748215cc8de8070493d089c33
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
<<<<<<< HEAD
      <Route path="/detail">
        <StudyDetailPages />
      </Route>
      <Route path="/test2">
        <VideoRoomComponent />
=======
      <Route path="/videoMeeting/:studyId">
        <VideoMeetingPages />
>>>>>>> b3b067a308f9a31748215cc8de8070493d089c33
      </Route>
      <Route path="/videoMeeting/waiting/:studyId/:userId">
        <WaitingPages />
      </Route>
      <Route path="/kakao/redirect/:accessToken">
        <KakaoPages />
      </Route>
      <Route path="/studySearch">
        <StudySearchPages />
      </Route>
    </Switch>
  );
}

export default Router;
