import { RequestMethods, Server } from '../../config';

export const Actions = {
  EMAIL_CHANGED: 'SIGN_UP_EMAIL_CHANGED',
  PASSWORD_CHANGED: 'SIGN_UP_PASSWORD_CHANGED',
  REPEATED_PASSWORD_CHANGED: 'REPEATED_PASSWORD_CHANGED',
  VALIDATE_EMAIL: 'VALIDATE_EMAIL',
  VALIDATE_EMAIL_SUCCESS: 'VALIDATE_EMAIL_SUCCESS',
  VALIDATE_EMAIL_FAIL: 'VALIDATE_EMAIL_FAIL',
  ENTER_LOGIN: 'ENTER_LOGIN',
  SIGN_IN_FROM_OTHER_ACCOUNTS: 'SIGN_UP_SIGN_IN_FROM_OTHER_ACCOUNTS',
  EMAIL_RESET: 'SIGN_UP_EMAIL_RESET',
  SIGN_UP_RESET: 'SIGN_UP_RESET',
  PASSWORD_FIELD_PRESSED: 'SIGN_UP_PASSWORD_FIELD_PRESSED',
};

export const emailChanged = email => ({
  type: Actions.EMAIL_CHANGED,
  payload: email,
});

export const passwordChanged = password => ({
  type: Actions.PASSWORD_CHANGED,
  payload: password,
});

export const repeatedPasswordChanged = password => ({
  type: Actions.REPEATED_PASSWORD_CHANGED,
  payload: password,
});

export const reset = () => ({ type: Actions.SIGN_UP_RESET });
export const resetEmail = () => ({ type: Actions.EMAIL_RESET });

export const validateEmail = email => ({
  type: Actions.VALIDATE_EMAIL,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.CHECK_EMAIL,
      data: {
        email,
      },
    },
  },
});
