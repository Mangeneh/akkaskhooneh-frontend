import { Server } from '../../config';

export const Actions = {
  NORMALIZE: 'PROFILE_EDIT_NORMALIZE',
  IMAGE_CHANGED: 'PROFILE_EDIT_IMAGE_CHANGED',
  EDIT_PROFILE: 'EDIT_PROFILE',
  EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
  EDIT_PROFILE_FAIL: 'EDIT_PROFILE_FAIL',
  CHANGE_PROFILE_PIC: 'CHANGE_PROFILE_PIC',
  CHANGE_PROFILE_PIC_SUCCESS: 'CHANGE_PROFILE_PIC_SUCCESS',
  CHANGE_PROFILE_PIC_FAIL: 'CHANGE_PROFILE_PIC_FAIL',
};

export const normalize = () => ({
  type: Actions.NORMALIZE,
});

export const editProfile = (fullName, bio) => ({
  type: Actions.EDIT_PROFILE,
  payload: {
    request: {
      method: 'POST',
      url: Server.EDIT_PROFILE,
      data: {
        fullname: fullName,
        bio,
      },
    },
  },
});

export const changeProfilePic = formData => ({
  type: Actions.CHANGE_PROFILE_PIC,
  payload: {
    request: {
      method: 'POST',
      url: Server.CHANGE_PROFILE_PIC,
      data: formData,
    },
  },
});
