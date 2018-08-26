export const Actions = {
    MODE_CHANGED: 'SIGN_UP_COMPLETE_MODE_CHANGED',
    IMAGE_CHANGED: 'SIGN_UP_COMPLETE_IMAGE_CHANGED',
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

export const signUpUser = (email, password, username, fullname, bio) => {
    return {
        type: Actions.SIGN_UP,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/register/',
                data: {
                    email: email,
                    password: password,
                    username: username,
                    fullname: fullname,
                    bio: bio
                }
            }
        }
    };
};