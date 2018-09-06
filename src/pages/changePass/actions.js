import { Server } from '../../config';

export const Actions = {
  PREVIOUS_PASSWORD_CHANGED: 'CHANGE_PASS_PREVIOUS_PASSWORD_CHANGED',
  NEW_PASSWORD_CHANGED: 'CHANGE_PASS_NEW_PASSWORD_CHANGED',
  REPEATED_PASSWORD_CHANGED: 'CHANGE_PASS_REPEATED_PASSWORD_CHANGED',
  CHANGE_PASS_FAIL: 'CHANGE_PASS_FAIL',
  CHANGE_PASS_SUCCESS: 'CHANGE_PASS_SUCCESS',
  CHANGE_PASS: 'CHANGE_PASS',
  CHANGE_PASS_RESET: 'CHANGE_PASS_RESET',
};

export const previousPasswordChanged = previousPassword => ({
  type: Actions.PREVIOUS_PASSWORD_CHANGED,
  payload: previousPassword,
});

export const newPasswordChanged = newPassword => ({
  type: Actions.NEW_PASSWORD_CHANGED,
  payload: newPassword,
});

export const repeatedPasswordChanged = repeatedPassword => ({
  type: Actions.REPEATED_PASSWORD_CHANGED,
  payload: repeatedPassword,
});

export const reset = () => ({ type: Actions.CHANGE_PASS_RESET });

export const changePassword = (oldPassword, newPassword) => ({
  type: Actions.CHANGE_PASS,
  payload: {
    request: {
      method: 'PUT',
      url: Server.CHANGE_PASSWORD,
      data: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    },
  },
});
