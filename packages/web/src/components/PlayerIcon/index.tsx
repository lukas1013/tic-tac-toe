import React from "react";

import './style.css';

//temp
const srcInd = Math.floor(Math.random() * 8 + 1)
const userIcon = require(`../../assets/icon${srcInd}.png`)

export default function PlayerIcon(): JSX.Element {
  return (
    <img src={userIcon} id="profile-icon" alt="profile.png" title="profile icon" />
  )
}