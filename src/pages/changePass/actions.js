export const Actions = {
    PREVIOUS_PASSWORD_CHANGED: 'CHANGE_PASS_PREVIOUS_PASSWORD_CHANGED',
    NEW_PASSWORD_CHANGED: 'CHANGE_PASS_NEW_PASSWORD_CHANGED',
    REPEATED_PASSWORD_CHANGED: 'CHANGE_PASS_REPEATED_PASSWORD_CHANGED',
    MODE_CHANGED: 'CHANGE_PASS_MODE_CHANGED',
};


export const previousPasswordChanged = (previousPassword) => {
    return {
        type: Actions.PREVIOUS_PASSWORD_CHANGED,
        payload: previousPassword
    }
};

export const newPasswordChanged = (newPassword) => {
    return {
        type: Actions.NEW_PASSWORD_CHANGED,
        payload: newPassword
    }
};

export const repeatedPasswordChanged = (repeatedPassword) => {
    return {
        type: Actions.REPEATED_PASSWORD_CHANGED,
        payload: repeatedPassword
    }
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const changePassword = (password) => {
    return {
        type: Actions,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/register/',
                data: {
                    email: email,
                    password: password,
                    username: username,
                    fullname: fullName,
                    bio: bio
                }
            }
        }
    };
};