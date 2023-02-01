import { Switch, Route } from "react-router-dom";
import LandingPages from "pages/LandingPages";
import StudyManagePages from "pages/StudyManagePages";
import TestPages from "pages/TestPages";
import VideoRoomComponent from "components/video-meeting/VideoRoomComponent";
function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPages />
      </Route>
      <Route path="/manage">
        <StudyManagePages />
      </Route>
      <Route path="/test">
        <TestPages />
      </Route>
      <Route path="/test2">
        <VideoRoomComponent />
      </Route>
    </Switch>
  );
}

export default Router;
