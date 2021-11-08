import React from "react";

import { AuthProvider, useAuth } from "../contexts/auth";
import { PlayerProvider } from "../contexts/player";

import PublicRoutes from './publicRoutes';
import PlayerRoutes from './playerRoutes';

export default function Routes(): JSX.Element {
  const { logged, player } = useAuth()
  console.log('logged', logged);
  
  return (
    <AuthProvider>
      <PublicRoutes />
      {logged && <PlayerProvider player={player}>
        <PlayerRoutes />
      </PlayerProvider>}
    </AuthProvider>
  )
}