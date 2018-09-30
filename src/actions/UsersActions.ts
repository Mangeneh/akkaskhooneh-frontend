import { Server } from '../config';
import { RequestMethods } from '../utils/RequestMethods';

export enum UsersActions {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS',
  UPDATE_USER_INFO = 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL',
  VALIDATE_EMAIL = 'VALIDATE_EMAIL',
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

export const loginUser = (email: string, password: string) => ({
  type: UsersActions.LOGIN,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.LOGIN_USER,
      data: {
        email: email.toLowerCase(),
        password,
      },
    },
  },
});

export const validateEmail = (email: string) => ({
  type: UsersActions.VALIDATE_EMAIL,
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

export const signOut = () => ({ type: UsersActions.SIGN_OUT });

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

export const updateUserInfo = (username: string | undefined = undefined) => {
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
