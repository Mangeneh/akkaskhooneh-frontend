import { Server } from '../../config';

export const Actions = {
  CHANGE_PASS_FAIL: 'CHANGE_PASS_FAIL',
  CHANGE_PASS_SUCCESS: 'CHANGE_PASS_SUCCESS',
  CHANGE_PASS: 'CHANGE_PASS',
};

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
