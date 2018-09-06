import { RequestMethods, Server } from '../../config';

export const Actions = {
  EMAIL_CHANGED: 'LOGIN_EMAIL_CHANGED',
  PASSWORD_CHANGED: 'LOGIN_PASSWORD_CHANGED',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN: 'LOGIN',
  ENTER_SIGN_UP: 'ENTER_SIGN_UP',
  SIGN_IN_FROM_OTHER_ACCOUNTS: 'LOGIN_SIGN_IN_FROM_OTHER_ACCOUNTS',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  EMAIL_RESET: 'LOGIN_EMAIL_RESET',
  PASSWORD_RESET: 'LOGIN_PASSWORD_RESET',
  LOGIN_RESET: 'LOGIN_RESET',
};

export const emailChanged = email => ({
  type: Actions.EMAIL_CHANGED,
  payload: email,
});

export const passwordChanged = password => ({
  type: Actions.PASSWORD_CHANGED,
  payload: password,
});

export const reset = () => ({ type: Actions.LOGIN_RESET });
export const resetEmail = () => ({ type: Actions.EMAIL_RESET });
export const resetPassword = () => ({ type: Actions.PASSWORD_RESET });

export const loginUser = (email, password) => ({
  type: Actions.LOGIN,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.LOGIN_USER,
      data: {
        email,
        password,
      },
    },
  },
});
