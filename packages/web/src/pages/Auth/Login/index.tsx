import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { BiLockAlt } from 'react-icons/bi';

import './style.css';

// type typeState = {
//   user?: string;
//   password?: string;
// }

// type typeProps = {
//   state: typeState | undefined;
//   login: (() => void);
//   formErrors: {
//     userName?: string;
//     email?: string;
//     password?: string;
//   },
//   validateInputValue: ((input: string, value: string | undefined) => void),
//   setInputValue: ((input: string, value: string) => void)
// }

export default function Login({ state, login, formErrors: loginError, validateInputValue: validateInput, setInputValue }): JSX.Element {
  const [shouldShowPass, setSSP] = useState(false)
  const isEmail = useMemo(() => /^[#!%$‘&+*–/=?\^`{|}~\.\w]{1,64}@[\w-\.]*$/.test(state.user || ''), [state.user]);

  return (
    <form id="login">
      <label htmlFor="user">Player or email</label>
      <FiUser className="icon" role="presentation" />

      <input
        type="text"
        id="user"
        required
        maxLength={128}
        inputMode="email"
        autoComplete={isEmail ? "email" : 'username'}
        onBlur={() => {
          if (isEmail) {
            validateInput('email', state.user)}
          }
        }
        pattern="^[a-zA-Z0-9_]+|[^\.@]([#!%$‘&+*–/=?\^`{|}~\.\w](?!\.\.)){0,64}@[\w\.-]{0,63}[^-\.]$"
        title="your registered player name or email address"
        placeholder=" "
        onChange={e => {
          setInputValue(isEmail ? 'email' : 'userName', e.target.value)
          if (!isEmail) {
            validateInput('userName', e.target.value)
          }
        }}
        value={state.userName ?? state.email}
      />

      <p id="user-error"
        className={!loginError?.[isEmail ? 'email' : 'userName'] ? "error hidden" : "error"}>{
          loginError?.[isEmail ? 'email' : 'userName']
        }
      </p>

      <label htmlFor="password">Password</label>
      <BiLockAlt id="lock" className="icon" role="presentation" />

      <input
        type={shouldShowPass ? "text" : "password"}
        id="password"
        required
        maxLength={30}
        minLength={8}
        title="your login password"
        pattern="[a-zA-Z0-9]{8,30}"
        placeholder=" "
        autoComplete="current-password"
        onChange={e => {
          setInputValue('password', e.target.value)
          validateInput('password', e.target.value)
        }}
        value={state.password}
      />

      <p id="password-error"
        className={!loginError?.password ? "error hidden" : "error"}>{
          loginError?.password
        }
      </p>

      {shouldShowPass && <FiEye className="icon eye" onClick={() => setSSP(false)} role="presentation" />}

      {!shouldShowPass && <FiEyeOff className="icon eye" onClick={() => setSSP(true)} role="presentation" />}


      <button className="rusty-red" type="button" onClick={login}>Login</button>

      <span id="link">
        Dont&apos;t have an account?&nbsp;
        <Link id="link-register" to="/register" replace={true} title="Login">Register</Link>
      </span>
    </form>
  )
}