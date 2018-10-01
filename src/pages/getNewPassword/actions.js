import { RequestMethods, Server } from '../../config';

export const Actions = {
  CHANGE_PASSWORD: 'GET_NEW_PASS_CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'GET_NEW_PASS_CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAIL: 'GET_NEW_PASS_CHANGE_PASSWORD_FAIL',
};

export const getNewPassword = (token, password) => ({
  type: Actions.CHANGE_PASSWORD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.GET_NEW_PASS,
      data: {
        token,
        password,
      },
    },
  },
});
