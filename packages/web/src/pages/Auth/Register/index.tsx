import React, { useState, memo } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import api from '../../../services/api';
import * as storage from '../../../shared/storage';

import './style.css';

function Register(props) {
  const history = useHistory();
  const { guest } = useParams<{ guest: string }>();
  const [isGuest, setIsGuest] = useState(!!guest);
  const [userName, setUserName] = useState(guest || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirPass, setConfirmPass] = useState('');

  function register() {
    //temp
    if (password !== confirPass) {
      return
    }

    api.post('/auth/signup', {
      name: userName,
      email,
      password
    }).then(response => {
      const { player, token } = response.data as { player: Record<string, unknown>, token: string };
      //stores in localStorage
      storage.save(['player','token'], [player,token]);
      //redirects to home
      history.replace('/')
    }).catch(e => {
      console.log(e)
    }) 
  }

  return (
    <form id="register">
      <label htmlFor="username">Player name</label>
      <input
        type="text"
        id="username"
        value={userName}
        maxLength={30}
        pattern="[\w_]+"
        placeholder={`player_${(new Date()).getFullYear()}`}
        onChange={e => setUserName(e.target.value)}
        required
        title="Letters, numbers or underline _"
      />

      <IsGuestCBLabel check={setIsGuest} checked={isGuest} />

      <label htmlFor="email">Email</label>
      <input
        disabled={isGuest}
        type="email"
        id="email"
        onChange={e => setEmail(e.target.value)}
        required
        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        placeholder=" "
        title="Real email address"
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        disabled={isGuest}
        type="password"
        id="password"
        maxLength={30}
        minLength={8}
        onChange={e => setPassword(e.target.value)}
        required
        pattern="[a-zA-Z0-9#_]{8,}"
        placeholder=" "
        title="Password of at least 8 digits. Letters, number ou #_"
        value={password}
      />

      <label htmlFor="confirm-pass">Confirm Password</label>
      <input
        disabled={isGuest}
        type="password"
        id="confirm-pass"
        maxLength={30}
        minLength={8}
        onChange={e => setConfirmPass(e.target.value)}
        required
        placeholder=" "
        title="Repeat the password"
        pattern={`${password}`}
        value={confirPass}
      />

      <button className="rusty-red" tabIndex={0} type="button" onClick={register}>Sign in</button>

      <span id="link">
        Already have account?&nbsp;
        <Link id="link-login" to="/login" replace={true} title="Login">Login</Link>
      </span>
    </form>
  )
}

function IsGuestCBLabel(props) {
  return (
    <>
      <svg
        role="checkbox"
        tabIndex={0}
        aria-roledescription="checkbox"
        id="is-guest-checkbox"
        onClick={() => props.check(!props.checked)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            props.check(!props.checked)
          }
        }}
        className={props.checked ? "checked" : "unset"}
        height="20"
        width="20">
        <polyline points="3,10,8,15,14,8,17,5" />
      </svg>
      <label onClick={() => props.check(!props.checked)} htmlFor="is-guest-checkbox">Guest</label>
    </>
  )
}

export default memo(Register)