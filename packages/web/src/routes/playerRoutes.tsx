import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { GameProvider } from '../contexts/game'
import Game from '../pages/Game';

export default function PlayerRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path="/game">
        <GameProvider>
          <Game />
        </GameProvider>
      </Route>
    </Switch>
  )
}