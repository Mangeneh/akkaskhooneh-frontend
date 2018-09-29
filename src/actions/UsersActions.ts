import { Server } from '../config';
import { RequestMethods } from '../utils/RequestMethods';

export enum UsersActions {
  UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS',
  UPDATE_USER_INFO = 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL',
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  FOLLOW_REQUEST_SUCCESS = 'FOLLOW_REQUEST_SUCCESS',
  FOLLOW_REQUEST_FAIL = 'FOLLOW_REQUEST_FAIL',
  UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST',
  UN_FOLLOW_REQUEST_SUCCESS = 'UN_FOLLOW_REQUEST_SUCCESS',
  UN_FOLLOW_REQUEST_FAIL = 'UN_FOLLOW_REQUEST_FAIL',
  DELETE_FOLLOW_REQUEST = 'DELETE_FOLLOW_REQUEST',
  DELETE_FOLLOW_REQUEST_SUCCESS = 'DELETE_FOLLOW_REQUEST_SUCCESS',
  DELETE_FOLLOW_REQUEST_FAIL = 'DELETE_FOLLOW_REQUEST_FAIL',
  SIGN_OUT = 'SIGN_OUT',
}

export const reset = () => ({ type: UsersActions.SIGN_OUT });

export const accessTokenUpdated = (refreshToken: string) => ({
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

export const updateUser = (username: string) => {
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

export const followRequest = (username: string) => ({
  type: UsersActions.FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});

export const unFollowRequest = (username: string) => ({
  type: UsersActions.UN_FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.UN_FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});

export const deleteFollowRequest = (username: string) => ({
  type: UsersActions.DELETE_FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.DELETE_FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});
