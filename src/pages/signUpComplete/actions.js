import { RequestMethods, Server } from '../../config';

export const Actions = {
  MODE_CHANGED: 'SIGN_UP_COMPLETE_MODE_CHANGED',
  IMAGE_CHANGED: 'SIGN_UP_COMPLETE_IMAGE_CHANGED',
  FULL_NAME_CHANGED: 'FULL_NAME_CHANGED',
  BIO_CHANGED: 'BIO_CHANGED',
  USER_NAME_CHANGED: 'USER_NAME_CHANGED',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAIL: 'SIGN_UP_FAIL',
  SIGN_UP_COMPLETE_RESET: 'SIGN_UP_COMPLETE_RESET',
};

export const imageChanged = image => ({
  type: Actions.IMAGE_CHANGED,
  payload: image,
});

export const usernameChanged = username => ({
  type: Actions.USER_NAME_CHANGED,
  payload: username,
});

export const bioChanged = bio => ({
  type: Actions.BIO_CHANGED,
  payload: bio,
});

export const fullNameChanged = fullName => ({
  type: Actions.FULL_NAME_CHANGED,
  payload: fullName,
});

export const reset = () => ({ type: Actions.SIGN_UP_COMPLETE_RESET });

export const signUpUser = (email, password, username, fullName, bio) => ({
  type: Actions.SIGN_UP,
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
