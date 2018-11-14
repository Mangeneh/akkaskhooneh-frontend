import { Action, ActionCreator } from 'redux';
import { RequestMethods, Server } from '../config';
import { UserAction } from '../types';

export enum UsersActions {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  // LOGIN_FAIL = 'LOGIN_FAIL',
  SEND_TOKEN = 'SEND_TOKEN',
  SEND_EMAIL = 'SEND_EMAIL',
  GET_NEW_PASSWORD = 'GET_NEW_PASSWORD',
  UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS = 'UPDATE_ACCESS_TOKEN_SUCCESS',
  UPDATE_USER_INFO = 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS',
  // UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL',
  VALIDATE_EMAIL = 'VALIDATE_EMAIL',
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  CHANGE_PASS = 'CHANGE_PASS',
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  // FOLLOW_REQUEST_SUCCESS = 'FOLLOW_REQUEST_SUCCESS',
  // FOLLOW_REQUEST_FAIL = 'FOLLOW_REQUEST_FAIL',
  UN_FOLLOW_REQUEST = 'UN_FOLLOW_REQUEST',
  // UN_FOLLOW_REQUEST_SUCCESS = 'UN_FOLLOW_REQUEST_SUCCESS',
  // UN_FOLLOW_REQUEST_FAIL = 'UN_FOLLOW_REQUEST_FAIL',
  DELETE_FOLLOW_REQUEST = 'DELETE_FOLLOW_REQUEST',
  // DELETE_FOLLOW_REQUEST_SUCCESS = 'DELETE_FOLLOW_REQUEST_SUCCESS',
  // DELETE_FOLLOW_REQUEST_FAIL = 'DELETE_FOLLOW_REQUEST_FAIL',
  EDIT_PROFILE = 'EDIT_PROFILE',
  CHANGE_PRIVATE_STATUS = 'CHANGE_PRIVATE_STATUS',
  CHANGE_PROFILE_PIC = 'CHANGE_PROFILE_PIC',
  SIGN_OUT = 'SIGN_OUT',
}

export const loginUser: ActionCreator<UserAction> = (email: string, password: string) => ({
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

export const sendEmail: ActionCreator<UserAction> = (email: string) => ({
  type: UsersActions.SEND_EMAIL,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.SEND_EMAIL,
      data: {
        email: email.toLowerCase(),
      },
    },
  },
});

export const sendToken: ActionCreator<UserAction> = (token: string) => ({
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

export const getNewPassword: ActionCreator<UserAction> = (token: string, password: string) => ({
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

export const validateEmail: ActionCreator<UserAction> = (email: string) => ({
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

export const signUpUser: ActionCreator<UserAction> =
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

export const signOut: ActionCreator<Action> = () => ({ type: UsersActions.SIGN_OUT });

export const accessTokenUpdated: ActionCreator<UserAction> = (refreshToken: string) => ({
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

export const updateUserInfo: ActionCreator<UserAction> =
  (username: string | undefined = undefined) => {
    const url = username ? `${Server.UPDATE_USER_INFO}${username}/` : Server.UPDATE_USER_INFO;
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

export const changePassword: ActionCreator<UserAction> =
  (oldPassword: string, newPassword: string) => ({
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

export const followRequest: ActionCreator<UserAction> = (username: string) => ({
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

export const unFollowRequest: ActionCreator<UserAction> = (username: string) => ({
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

export const deleteFollowRequest: ActionCreator<UserAction> = (username: string) => ({
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

export const editProfile: ActionCreator<UserAction> = (fullName: string, bio: string) => ({
  type: UsersActions.EDIT_PROFILE,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.EDIT_PROFILE,
      data: {
        fullname: fullName,
        bio,
      },
    },
  },
});

export const changeStatus: ActionCreator<UserAction> = () => ({
  type: UsersActions.CHANGE_PRIVATE_STATUS,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.CHANGE_PRIVATE_STATUS,
    },
  },
});

export const changeProfilePic: ActionCreator<UserAction> = (formData: FormData) => ({
  type: UsersActions.CHANGE_PROFILE_PIC,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.CHANGE_PROFILE_PIC,
      data: formData,
    },
  },
});
