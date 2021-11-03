import { getObjectCopy } from "../../utils"

type typeLogin = {
  userName?: string;
  email?: string;
  password: string;
}

type typeRegister = {
  userName: string;
  email: string;
  password: string;
  confirmPass: string;
  isGuest?: boolean;
}

interface AuthStateInterface {
  formType?: 'login' | 'register',
  form: {
    login?: typeLogin,
    register?: typeRegister
  }
}

type typeInput = 'user' | 'userName' | 'email' | 'password' | 'confirmPass' | 'isGuest';

interface ActionInterface {
  type: 'set value';
  value: string | boolean;
  form: 'login' | 'register';
  input: typeInput;
}

export default function authReducer(state: AuthStateInterface, action: ActionInterface): AuthStateInterface {
  const newState = getObjectCopy(state as any) as unknown as AuthStateInterface
  const form = action.form === 'register' ? newState.form.register : newState.form.login;

  if (action.type === 'set value' && form) {
    form[action.input] = action.value
    if (action.form === 'login') {
      if (action.input === 'email') {
        delete form.userName
      } else {
        delete form.email
      }
    }
  }

  return newState;
}