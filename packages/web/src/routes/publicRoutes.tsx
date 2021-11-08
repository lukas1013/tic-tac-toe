import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Home from "../pages/Home";
import Auth from "../pages/Auth";

export default function PublicRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path={['/register', '/login']} component={Auth} />
    </Switch>
  )
}