import React from "react";
import { Link } from "react-router-dom";

import './style.css';

import PlayerIcon from "../../components/PlayerIcon";

export default function Home(): JSX.Element {
  return (
    <>
      <header>
        <div className="content">
          <PlayerIcon/>
          <span id="user-name">Guest49208439201</span>

          <span id="level">
            lvl1
          </span>

          <span id="score-text">
            Score
          </span>

          <span id="player-score">
            0
          </span>
        </div>
      </header>

      <nav className="button-container">
        <button className='home'>
          Play as Guest
        </button>

        <button className='home'>
          Create Account
        </button>

        <button className='home'>
          Login
        </button>

        <button className='home'>
          Rank
        </button>

        <button className='home'>
          Settings
        </button>
      </nav >
    </>
  )
}