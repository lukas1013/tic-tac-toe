import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";
import { BiLockAlt } from 'react-icons/bi'

import './style.css';

function Register({ state, register, formErrors: registerError, validateInputValue: validateInput, setInputValue, guest }) {
  return (
    <form id="register">
      <fieldset id="username-field">
        <label htmlFor="username">Player name</label>

        <FiUser id="user-icon" className="icon" role="presentation" />

        <input
          type="text"
          id="username"
          value={state?.userName}
          maxLength={30}
          pattern="[\w]+"
          autoComplete="username"
          placeholder={`player_${(new Date()).getFullYear()}`}
          onChange={e => {
            setInputValue('userName', e.target.value)
            validateInput('userName', e.target.value)
          }}
          required
          title="Letters, numbers or underline _"
        />

        <p id="username-error"
          className={!registerError?.userName ? "error hidden" : "error"}>{
            registerError?.userName
          }</p>
      </fieldset>

      <p id="cb-container">
        <IsGuestCBLabel check={() => setInputValue('isGuest', !(state.isGuest))} checked={state.isGuest} />
      </p>

      <fieldset id="email-field" disabled={state.isGuest}>
        <label htmlFor="email">Email</label>

        <FiMail id="email-icon" className="icon" role="presentation" />

        <input
          type="email"
          id="email"
          onChange={e => {
            setInputValue('email', e.target.value)
          }}
          onBlur={() => validateInput('email', state?.email)}
          required
          maxLength={128}
          autoComplete="email"
          pattern="^[^\.@]([#!%$‘&+*–/=?\^`{|}~\.a-zA-Z0-9](?!\.\.)){0,64}@[a-zA-Z0-9\.-]{0,63}[^-\.]$"
          placeholder="john@gmail.com"
          title="Real email address"
          value={state?.email}
        />

        <p id="email-error"
          className={!registerError?.email ? "error hidden" : "error"}>{
            registerError?.email
          }</p>

      </fieldset>

      <fieldset id="pass-field" disabled={state.isGuest}>
        <label htmlFor="password">Password</label>

        <BiLockAlt id="password-icon" className="icon" role="presentation" />

        <input
          type="password"
          id="password"
          maxLength={30}
          minLength={8}
          autoComplete="new-password"
          onChange={e => {
            setInputValue('password', e.target.value)
            validateInput('password', e.target.value)
          }}
          onBlur={() => state?.password.length < 8 && validateInput('password', state?.password)}
          required
          pattern="[a-zA-Z0-9]{8,30}"
          placeholder="password123"
          title="Password of at least 8 digits. Numbers and letters only"
          value={state?.password}
        />

        <p id="password-error"
          className={!registerError?.password ? "error hidden" : "error"}>{
            registerError?.password
          }</p>

      </fieldset>

      <fieldset id="confirm-pass-field" disabled={state.isGuest}>
        <label htmlFor="confirm-pass">Confirm Password</label>

        <BiLockAlt id="confirm-pass-icon" className="icon" role="presentation" />

        <input
          type="password"
          id="confirm-pass"
          maxLength={30}
          minLength={8}
          onChange={e => {
            setInputValue('confirmPass', e.target.value)
            if (e.target.value === state?.password) {
              validateInput('confirmPass', e.target.value)
            }
          }}
          required
          autoComplete="new-password"
          placeholder="repeat the password"
          title="Repeat the password"
          pattern={`${state?.password}`}
          value={state?.confirmPass}
        />

        <p id="confirm-pass-error"
          className={(state?.confirmPass !== state?.password && !!state?.confirmPass.length || registerError?.confirmPass) ? "error" : "error hidden"}>{
            registerError?.confirmPass && !state?.confirmPass.length ? registerError?.confirmPass : 'Password must be same'
          }</p>
      </fieldset>

      <button className="rusty-red" tabIndex={0} type="button" onClick={register}>Sign in</button>

      <p id="link">
        Already have account?&nbsp;
        <Link id="link-login" to="/login" replace={true} title="Login">Login</Link>
      </p>
    </form>
  )
}

function IsGuestCBLabel(props: { checked: boolean, check: ((check: boolean) => void) }) {
  return (
    <>
      <svg
        role="checkbox"
        aria-checked={props.checked}
        tabIndex={0}
        id="is-guest-checkbox"
        onClick={() => props.check(!props.checked)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            props.check(!props.checked)
          }
        }}
        aria-labelledby="cb-label"
        viewBox="0 0 20 20"
        className={props.checked ? "checked" : "unset"}
        height="20"
        width="20">
        <polyline points="3,10,8,15,14,8,17,5" />
      </svg>

      <label id="cb-label" onClick={() => props.check(!props.checked)} htmlFor="is-guest-checkbox">Guest</label>
    </>
  )
}

export default memo(Register)