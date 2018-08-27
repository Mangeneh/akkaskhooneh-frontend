export const Actions = {
    MODE_CHANGED: 'PROFILE_EDIT_MODE_CHANGED',
    IMAGE_CHANGED: 'PROFILE_EDIT_IMAGE_CHANGED',
    EDIT_PROFILE: 'EDIT_PROFILE',
    EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
    EDIT_PROFILE_FAIL: 'EDIT_PROFILE_FAIL',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const imageChanged = (image) => {
    return {
        type: Actions.IMAGE_CHANGED,
        payload: image
    }
};

export const editProfile = (fullName, bio) => {
    return {
        type: Actions.EDIT_PROFILE,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/editprofile/',
                data: {
                    fullname: fullName,
                    bio: bio
                }
            }
        }
    };
};