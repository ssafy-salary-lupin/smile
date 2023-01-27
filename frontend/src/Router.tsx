import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import StudyManagePages from "./pages/StudyManagePages";
import TestPages from "./pages/TestPages";

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
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
