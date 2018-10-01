import { RequestMethods, Server } from '../../config';

export const Actions = {
  FORGOT_PASSWORD: 'SEND_EMAIL_FOR_FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS: 'SEND_EMAIL_FOR_FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL: 'SEND_EMAIL_FOR_FORGOT_PASSWORD_FAIL',
};

export const sendEmail = email => ({
  type: Actions.FORGOT_PASSWORD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.FORGOT_PASSWORD,
      data: {
        email: email.toLowerCase(),
      },
    },
  },
});
