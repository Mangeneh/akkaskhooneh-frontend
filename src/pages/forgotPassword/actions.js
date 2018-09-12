import { RequestMethods, Server } from '../../config';

export const Actions = {
    EMAIL_CHANGED: 'FORGOT_PASS_EMAIL_CHANGED',
    FORGOT_PASSWORD: 'SEND_EMAIL_FOR_FORGOT_PASSWORD',
    FORGOT_PASSWORD_SUCCESS: 'SEND_EMAIL_FOR_FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAIL: 'SEND_EMAIL_FOR_FORGOT_PASSWORD_FAIL',
  };

  export const emailChanged = email => ({
    type: Actions.EMAIL_CHANGED,
    payload: email,
});

export const sendEmailForForgotPassword = email => ({
  type: Actions.FORGOT_PASSWORD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.FORGOT_PASSWORD,
      data: {
        email,
      },
    },
  },
});
