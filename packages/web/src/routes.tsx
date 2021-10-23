import React from "react";
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path={['/register', '/login']} component={Auth} />
    </Switch>
  )
}