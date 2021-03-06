import { RequestMethods, Server } from '../../config';

export const Actions = {
  SEND_TOKEN: 'SEND_TOKEN_FOR_FORGOT_PASSWORD',
  SEND_TOKEN_SUCCESS: 'SEND_TOKEN_FOR_FORGOT_PASSWORD_SUCCESS',
  SEND_TOKEN_FAIL: 'SEND_TOKEN_FOR_FORGOT_PASSWORD_FAIL',
  CODE_CHANGED: 'SEND_TOKEN_CODE_CHANGED',
};

export const sendToken = token => ({
  type: Actions.SEND_TOKEN,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.SEND_TOKEN,
      data: {
        token,
      },
    },
  },
});

export const codeChanged = code => ({
  type: Actions.CODE_CHANGED,
  payload: code,
});
