import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import isValid from "./utils/checkInput";
import errorsCode from './utils/errorsCode';
import { getObjectCopy } from "../utils";
import api from '../services/api';
import * as storage from '../helpers/storage';
import socket from "../socket";

export type typeInput = 'userName' | 'email' | 'password' | 'confirmPass';

interface AuthError {
  [index: string]: {
    input: typeInput,
    error: string
  }
}

type typeInputError = {
  [typeInput: string]: string
}

export type typeGetInputValidation = (input: typeInput[], value: string[], isSubmit?: boolean) => AuthError;
type typeAddError = (...args: [type: 'length', input: 'password', authError?: AuthError] | [type: 'invalid' | 'required', input: typeInput, authError?: AuthError]) => void;
type typeGetErrors = (inputs?: Array<typeInput>) => typeInputError;
type typeCanSubmit = (entries: { userName?: string, email?: string, password?: string, confirmPass?: string, isGuest?: boolean }, isLogin: boolean) => boolean;
type typeSubmit = (entries: { userName?: string, email?: string, password: string, isGuest?: boolean }, form: 'login' | 'register') => void;

export interface Player {
  name: string;
  email: string;
  score: string;
  level: string;
}

interface contextProps {
  validateInput: typeGetInputValidation;
  formErrors: typeInputError;
  submit: typeSubmit;
  logged: boolean;
  player: Player | null;
  logout: (() => void)
}

type typeChildren = Array<JSX.Element | null | boolean>

const AuthContext = createContext({ logged: storage.retrieve('token') ? true : false, player: storage.retrieve('player') } as contextProps)

export const AuthProvider = ({ children }: { children: typeChildren }): JSX.Element => {
  const [authError, setAuthError]: [AuthError, React.Dispatch<React.SetStateAction<AuthError>>] = useState({})
  const [formErrors, setFormErrors] = useState({} as typeInputError)
  const token = useMemo(() => storage.retrieve('token'), [])
  const [logged, setLogged] = useState(!!token)
  const [player, setPlayer] = useState(logged ? storage.retrieve('player') : null)
  const history = useHistory()

  useEffect(() => {
    if (logged && token) {
      socket.emit('online', token)
    }
  }, [logged, token])
  
  const getErrors = useCallback<typeGetErrors>((inputs = ['userName', 'email', 'password', 'confirmPass']): typeInputError => {
    const _authError = authError;
    const errors = {};

    // returns a maximum of 1 error for each input
    for (const input of inputs) {
      const keys = Object.keys(_authError).sort((a, b) => Number(b) - Number(a))
      for (const key of keys) {
        if (_authError[key].input === input) {
          errors[input] = _authError[key].error
          break
        }
      }
    }
    return errors
  }, [authError]);

  useEffect(() => {
    setFormErrors(getErrors())
  }, [getErrors])

  const addError = useCallback<typeAddError>((...args) => {
    const _authError = args[2] || getObjectCopy(authError) as AuthError

    // if it's bigger than zero
    if (args[0] === 'length') {
      _authError[errorsCode.length[args[1]].code] = {
        input: args[1],
        error: errorsCode.length[args[1]].message
      }
    } else if (args[0] === 'required') {
      _authError[errorsCode.required.input[args[1]]] = {
        input: args[1],
        error: errorsCode.required.message
      }
    } else if (args[0] === 'invalid') {
      const errorCode = errorsCode.invalid[args[1]].code
      const error = errorsCode.invalid[args[1]].message
      _authError[errorCode] = { input: args[1], error }
    }
    if (!args[2]) {
      setAuthError(_authError);
    }
  }, [authError])

  const getInputValidation = useCallback<typeGetInputValidation>((inputs, values, isSubmit = false) => {
    const _authError = getObjectCopy(authError) as AuthError
    let _isValid: boolean, invalidCode: string, lengthCode: string, requiredCode: string

    for (const key in inputs) {
      _isValid = inputs[key] === 'confirmPass' ? true : isValid(inputs[key] as Exclude<typeInput, 'confirmPass'>, values[key]);

      invalidCode = errorsCode.invalid[inputs[key]]?.code
      lengthCode = errorsCode.length[inputs[key]]?.code
      requiredCode = errorsCode.required.input[inputs[key]]

      // required
      if (isSubmit && !values[key].length && !(requiredCode in _authError)) {
        addError('required', inputs[key], _authError)
      } else if (values[key].length && requiredCode in _authError) {
        delete _authError[requiredCode]
      }

      // invalid
      if (!_isValid && !(invalidCode in _authError)) {
        addError('invalid', inputs[key], _authError)
      } else if (_isValid && invalidCode in _authError) {
        delete _authError[invalidCode]
      }

      // length
      if (isSubmit && inputs[key] === 'password') {
        if (values[key].length < 8 && !(lengthCode in _authError)) {
          addError('length', inputs[key] as 'password', _authError)
        } else if (values[key].length >= 8 && lengthCode in _authError) {
          delete _authError[lengthCode]
        }
      } else if (inputs[key] === 'password' && lengthCode in _authError) {
        delete _authError[lengthCode]
      }
    }

    setAuthError(_authError)
    return _authError
  }, [addError, authError]);

  const canSubmit = useCallback<typeCanSubmit>((entries, isLogin = true): boolean => {
    const { userName, email, password, confirmPass, isGuest = false } = entries;
    const inputs = isLogin ? [email?.length ? email : userName, password] : [userName, email, password, confirmPass];
    const props: Array<typeInput> = isLogin ? [email?.length ? 'email' : 'userName', 'password'] : ['userName', 'email', 'password', 'confirmPass'];

    // Array may contain undefined
    const _authError = getInputValidation(props, inputs.map(i => i?.length ? i : ''), true)

    if (Object.keys(_authError).length || !isLogin && (password !== confirmPass || !confirmPass?.length)) {
      return false
    }

    return true;
  }, [formErrors, getInputValidation])

  const login = useCallback((entries: { user: string, password: string }) => {
    api.post('/auth/signin', {
      ...entries
    }).then(response => {
      const { player, token } = response.data as { player: Player, token: string }
      //stores in localStorage
      storage.save(['player', 'token'], [player, token]);
      setLogged(true)
      setPlayer(player)
      //redirects to home
      history.replace('/')
    }).catch(e => {
      console.log(e)
    })
  }, [history])

  const logout = useCallback(() => {
    storage.deleteAll()
    setLogged(false)
    setPlayer(null)
  }, [])

  const register = useCallback((entries: { name: string, email?: string, password?: string, isGuest?: boolean }) => {
    api.post('/auth/signup', {
      ...entries
    }).then(response => {
      const { player, token } = response.data as { player: Player, token: string }
      //stores in localStorage
      storage.save(['player', 'token'], [player, token]);
      setLogged(true)
      setPlayer(player)
      //redirects to home
      history.replace('/')
    }).catch(e => {
      console.log(e)
    })
  }, [history])

  const submit = useCallback<typeSubmit>((entries, form = 'login') => {
    const isLogin = !!(form === 'login');
    const _canSubmit = canSubmit(entries, isLogin);
    const _entries = isLogin ? {
      user: entries.email ?? entries.userName,
      password: entries.password
    } : ({
      name: entries.userName,
      email: entries.email,
      password: entries.password,
      isGuest: entries?.isGuest ?? false
    })

    if (!_canSubmit) {
      return
    }

    if (isLogin) {
      return login(_entries as { user: string, password: string })
    }
    register(_entries as { name: string, email?: string, password?: string, isGuest?: boolean })
  }, [canSubmit, login, register])

  const contextValue = useMemo(() => ({ formErrors, submit, validateInput: getInputValidation, logged, player, logout }), [formErrors, submit, getInputValidation, logged, player, logout])

  return (
    <AuthContext.Provider value={contextValue}>{
      children
    }</AuthContext.Provider>
  )
}

export function useAuth(): contextProps {
  const context = useContext(AuthContext)
  return context
}