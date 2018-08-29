import {Server} from "../../config";

export const Actions = {
    MODE_CHANGED: 'PROFILE_EDIT_MODE_CHANGED',
    IMAGE_CHANGED: 'PROFILE_EDIT_IMAGE_CHANGED',
    EDIT_PROFILE: 'EDIT_PROFILE',
    EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS',
    EDIT_PROFILE_FAIL: 'EDIT_PROFILE_FAIL',
    CHANGE_PROFILE_PIC: 'CHANGE_PROFILE_PIC',
    CHANGE_PROFILE_PIC_SUCCESS: 'CHANGE_PROFILE_PIC_SUCCESS',
    CHANGE_PROFILE_PIC_FAIL: 'CHANGE_PROFILE_PIC_FAIL',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const editProfile = (fullName, bio) => {
    return {
        type: Actions.EDIT_PROFILE,
        payload: {
            request: {
                method: 'POST',
                url: Server.EDIT_PROFILE,
                data: {
                    fullname: fullName,
                    bio: bio
                }
            }
        }
    };
};

export const changeProfilePic = (formData) => {
    return {
        type: Actions.CHANGE_PROFILE_PIC,
        payload: {
            request: {
                method: 'POST',
                url: Server.CHANGE_PROFILE_PIC,
                data: formData
            }
        }
    };
};