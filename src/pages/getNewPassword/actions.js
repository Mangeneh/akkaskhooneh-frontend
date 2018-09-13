import { RequestMethods, Server } from '../../config';

export const Actions = {
  PASSWORD_CHANGED: 'GET_NEW_PASS_PASSWORD_CHANGED',
  CHANGE_PASSWORD: 'GET_NEW_PASS_CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'GET_NEW_PASS_CHANGE_PASSWORD_SUCCESS',  
  CHANGE_PASSWORD_FAIL: 'GET_NEW_PASS_CHANGE_PASSWORD_FAIL',
};

export const passwordChanged = password => ({
  type: Actions.PASSWORD_CHANGED,
  payload: password,
});

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
