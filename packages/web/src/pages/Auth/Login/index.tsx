import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import './style.css';

import api from '../../../services/api';
import * as storage from '../../../shared/storage';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('')

  function login() {
    api.post('/auth/signin', {
      user,
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
    <form id="login">
      <label htmlFor="user">Username or email</label>
      <input
        type="text"
        id="user"
        required
        value={user}
        pattern="[\w0-9_]+|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        title="your player name or registered email"
        placeholder=" "
        onChange={e => setUser(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        required
        maxLength={30}
        title="your login password"
        pattern="[a-zA-Z0-9]{8,}"
        placeholder=" "
        onChange={e => setPassword(e.target.value)}
      />

      <button className="rusty-red" type="button" onClick={login}>Login</button>

      <span id="link">
        Dont&apos;t have an account?&nbsp;
        <Link id="link-register" to="/register" replace={true} title="Login">Register</Link>
      </span>
    </form>
  )
}