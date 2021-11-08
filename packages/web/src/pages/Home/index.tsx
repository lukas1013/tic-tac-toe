import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import './style.css';

import PlayerIcon from "../../components/PlayerIcon";
import { useAuth } from "../../contexts/auth";
import socket from '../../socket';

export default function Home(): JSX.Element {
  const { logout, player, logged } = useAuth()
  const [guest, setGuest] = useState(`guest${uuidv4().replace(/-/g, '').slice(0, 12)}`)

  return (
    <main id="home">
      <header>
        <div className="content">
          <PlayerIcon />
          <span id="user-name">{logged ? player?.name : guest}</span>

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
          <Link tabIndex={-1} to={`/`}>
            <button className='home rusty-red'>
              Play as Guest
            </button>
          </Link>}

        {player &&
          <Link tabIndex={-1} to="/game">
            <button className='home rusty-red'>
              Play
            </button>
          </Link>}

        {!player &&
          <Link tabIndex={-1} to={`/register`}>
            <button className='home rusty-red'>
              Create Account
            </button>
          </Link>}

        {!player &&
          <Link tabIndex={-1} to={'/login'}>
            <button className='home rusty-red'>
              Login
            </button>
          </Link>}

        <Link tabIndex={-1} to={`/`}>
          <button className='home rusty-red'>
            Rank
          </button>
        </Link>

        <Link tabIndex={-1} to={`/`}>
          <button className='home rusty-red'>
            Settings
          </button>
        </Link>

        {player &&
          <button className='home rusty-red' onClick={logout}>
            Exit
          </button>}
      </nav >
    </main>
  )
}