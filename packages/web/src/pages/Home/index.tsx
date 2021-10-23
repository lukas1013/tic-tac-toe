import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import './style.css';

import PlayerIcon from "../../components/PlayerIcon";

import * as storage from '../../shared/storage';

export default function Home(): JSX.Element {
  const [guest, setGuest] = useState('Guest49208439201')
  const [player, setPlayer] = useState(storage.retrieve('player'))

  return (
    <main id="home">
      <header>
        <div className="content">
          <PlayerIcon />
          <span id="user-name">{player?.name || guest}</span>

          <span id="level">lvl
            {
              player?.level || '1'
            }
          </span>

          <span id="score-text">
            Score
          </span>

          <span id="player-score">
            {
              player?.score || 0
            }
          </span>
        </div>
      </header>

      <nav className="button-container">
        {!player &&
          <Link to={`/`}>
            <button className='home rusty-red'>
              Play as Guest
            </button>
          </Link>}

        {player && <button className='home rusty-red'>
          Play
        </button>}

        {!player &&
          <Link to={`/register`}>
            <button className='home rusty-red'>
              Create Account
            </button>
          </Link>}

        {!player &&
          <Link to={'/login'}>
            <button className='home rusty-red'>
              Login
            </button>
          </Link>}

        <Link to={`/`}>
          <button className='home rusty-red'>
            Rank
          </button>
        </Link>

        <Link to={`/`}>
          <button className='home rusty-red'>
            Settings
          </button>
        </Link>

        {player &&
          <button className='home rusty-red' onClick={() => {
            storage.deleteAll()
            setPlayer(null)
          }}>
            Sair
          </button>}
      </nav >
    </main>
  )
}