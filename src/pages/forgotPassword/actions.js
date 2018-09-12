import { RequestMethods, Server } from '../../config';

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
