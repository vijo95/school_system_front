import React from "react";
import { Switch, Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from './container/pages/Login/Login'
import Home from './container/pages/Home/Home'
import CreateProfile from './container/pages/CreateProfile/CreateProfile'
import CreateTask from './container/pages/CreateTask/CreateTask'
import CreateTest from './container/pages/CreateTest/CreateTest'
import StudentTasks from './container/pages/StudentTasks/StudentTasks'
import StudentTests from './container/pages/StudentTests/StudentTests'

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/create-profile/" component={CreateProfile} />
      <Route exact path="/create-task/" component={CreateTask} />
      <Route exact path="/create-test/" component={CreateTest} />
      <Route exact path="/student-tasks/:task_id" component={StudentTasks} />
      <Route exact path="/student-tests/:test_id" component={StudentTests} />
      <Route exact path="/login/" component={Login} />
    </Switch>
  </Hoc>
);

export default BaseRouter;