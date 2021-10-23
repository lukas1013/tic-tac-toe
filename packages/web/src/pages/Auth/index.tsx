import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FiChevronLeft } from 'react-icons/fi';

import './style.css';

import Register from "./Register";
import Login from "./Login";

export default function Auth() {
  const location = useLocation()
  const history = useHistory()

  return (
    <main id="auth">
      <header>
        <FiChevronLeft id="back" onClick={() => history.replace('/')}/>

        <h1 id="title">
          {
            location.pathname.match(/login/i) ? 'Login' : 'Create Account'
          }
        </h1>
      </header>
      {
        location.pathname.match(/login/i) ? <Login /> : <Register />
      }
    </main>
  )
}