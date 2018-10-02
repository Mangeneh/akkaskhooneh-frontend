import { Server } from '../config';
import { RequestMethods } from '../utils/RequestMethods';

export enum UsersActions {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  SEND_TOKEN = 'SEND_TOKEN',
  SEND_EMAIL = 'SEND_EMAIL',
  GET_NEW_PASSWORD = 'GET_NEW_PASSWORD',
  UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS',
  UPDATE_USER_INFO = 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL',
  VALIDATE_EMAIL = 'VALIDATE_EMAIL',
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  CHANGE_PASS = 'CHANGE_PASS',
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

export const sendEmail = (email: string) => ({
  type: UsersActions.SEND_EMAIL,
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

export const sendToken = (token: string) => ({
  type: UsersActions.SEND_TOKEN,
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

export const getNewPassword = (token: string, password: string) => ({
  type: UsersActions.GET_NEW_PASSWORD,
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

export const signUpUser =
  (email: string, password: string, username: string, fullName: string, bio: string) => ({
    type: UsersActions.SIGN_UP,
    payload: {
      request: {
        method: RequestMethods.POST,
        url: Server.SIGN_UP_USER,
        data: {
          email,
          password,
          username,
          fullname: fullName,
          bio,
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

export const changePassword = (oldPassword: string, newPassword: string) => ({
  type: UsersActions.CHANGE_PASS,
  payload: {
    request: {
      method: RequestMethods.PUT,
      url: Server.CHANGE_PASSWORD,
      data: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    },
  },
});

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
