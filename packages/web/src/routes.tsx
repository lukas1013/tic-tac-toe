import React from "react";
import {
  Switch,
  Route
} from 'react-router-dom';

import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <AuthProvider>
      <Route path='/' exact component={Home} />
        <Route path={['/register', '/login']} component={Auth} />
      </AuthProvider>
    </Switch >
  )
}