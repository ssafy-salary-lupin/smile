import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import StudyManagePages from "./pages/StudyManagePages";
import StudyCreatePages from "./pages/StudyCreatePages";
import TestPages from "./pages/TestPages";
import VideoRoomComponent from "components/video-meeting/VideoRoomComponent";
import WaitingPages from "./pages/WaitingPages";
// import Settings from "pages/Settings";
// import Settings from "./pages/Settings";
function Router() {
  return (
    <BrowserRouter>
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
        <Route path="/create">
          <StudyCreatePages />
        </Route>
        <Route path="/test2">
          <VideoRoomComponent />
        </Route>
        <Route path="/test3">
          <WaitingPages />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
