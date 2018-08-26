export const Actions = {
    MODE_CHANGED: 'SIGN_UP_COMPLETE_MODE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
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