import { RequestMethods, Server } from '../config';

export const UsersActions = {
  UPDATE_ACCESS_TOKEN: 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS: 'UPDATE_ACCESS_TOKEN_SUCCESS',
  SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL: 'UPDATE_USER_INFO_FAIL',
  SIGN_OUT: 'SIGN_OUT',
};

export const reset = () => ({ type: UsersActions.SIGN_OUT });

export const refreshTokenSet = refreshToken => ({
  type: UsersActions.SET_REFRESH_TOKEN,
  payload: refreshToken,
});

export const accessTokenSet = accessToken => ({
  type: UsersActions.SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const accessTokenUpdated = refreshToken => ({
  type: UsersActions.UPDATE_ACCESS_TOKEN,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.UPDATE_ACCESS_TOKEN,
      data: {
        refresh: refreshToken,
      },
    },
  },
});

export const updateUser = (username) => {
  const url = username ? `${Server.UPDATE_USER}${username}/` : Server.UPDATE_USER;
  return {
    type: UsersActions.UPDATE_USER_INFO,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};
