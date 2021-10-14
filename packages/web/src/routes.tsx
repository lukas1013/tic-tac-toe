import React from "react";
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from "./pages/Home";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  )
}