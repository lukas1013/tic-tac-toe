import React, { Suspense, useCallback, useMemo, useReducer } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiChevronLeft } from 'react-icons/fi';

import './style.css';

import { useAuth } from "../../contexts/AuthContext";
import authReducer from "./reducer";

const Register = React.lazy(() => import("./Register"));
const Login = React.lazy(() => import("./Login"));

type typeInput = 'userName' | 'email' | 'password' | 'confirmPass' | 'isGuest';
type typeValidateInputValue = ((input: Exclude<typeInput, 'isGuest'>, value: string) => void)
type typeSetInputValue = ((input: typeInput, value: string | boolean) => void)

interface Props {
  state: {
    user?: string;
    userName?: string;
    email?: string;
    password?: string;
    confirmPass?: string;
    isGuest?: boolean;
  },
  setInputValue: typeSetInputValue,
  validateInputValue: typeValidateInputValue,
  formErrors: Record<string, unknown>;
}

interface RegisterProps extends Props {
  register: (() => void);
  guest: string;
}

export default function Auth(): JSX.Element {
  const { formErrors, submit, validateInput, clearErrors } = useAuth();
  const location = useLocation()
  const { guest } = useParams<{ guest: string }>();
  const form = useMemo(() => {
    return location.pathname.match(/login/i) ? 'login' : 'register';
  }, [location.pathname])

  const [state, dispatch] = useReducer(authReducer, {
    form: {
      [form]: location.pathname.match(/login/i) ? { user: '', password: '' } : { userName: '', email: '', password: '', confirmPass: '' }
    }
  })

  const setInputValue = useCallback<typeSetInputValue>((input, value) => {
    dispatch({
      form,
      input,
      type: 'set value',
      value
    })
  }, [form])

  const validateInputValue = useCallback<typeValidateInputValue>((input, value) => {
    validateInput([input], [value], false)
  }, [validateInput])

  const login = useCallback(() => {
    const loginForm = state.form.login;
    if (loginForm) {
      submit(loginForm, 'login')
    }
  }, [state.form.login, submit]);

  const register = useCallback(() => {
    const registerForm = state.form.register;
    if (registerForm) {
      submit(registerForm, 'register')
    }
  }, [state.form.register, submit])

  return (
    <main id="auth" className={location.pathname.replace('/', '').toLowerCase()}>
      <header>
        <Link to="/" replace={true} title="home">
          <FiChevronLeft id="back" title="home button" />
        </Link>

        <h1 id="title">
          {
            location.pathname.match(/login/i) ? 'Login' : 'Create Account'
          }
        </h1>
      </header>
      <Suspense fallback={<div>
        Loading...
      </div>}>
        {
          location.pathname.match(/login/i) ? <Login {...{ state: state.form?.login, setInputValue, validateInputValue, formErrors, login } } /> : <Register {...{ state: state.form?.register, setInputValue, validateInputValue, formErrors, register, guest } as RegisterProps } />
        }

      </Suspense>
    </main>
  )
}