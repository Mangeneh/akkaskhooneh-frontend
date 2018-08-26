export const Actions = {
    MODE_CHANGED: 'SIGN_UP_COMPLETE_MODE_CHANGED',
    FULL_NAME_CHANGED: 'FULL_NAME_CHANGED',
    BIO_CHANGED: 'BIO_CHANGED',
    USER_NAME_CHANGED: 'USER_NAME_CHANGED',
    SIGN_UP: 'SIGN_UP',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAIL: 'SIGN_UP_FAIL',
    SIGN_UP_COMPLETE_RESET: 'SIGN_UP_COMPLETE_RESET'
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const usernameChanged = (username) => {
    return {
        type: Actions.USER_NAME_CHANGED,
        payload: username
    }
};

export const bioChanged = (bio) => {
    return {
        type: Actions.BIO_CHANGED,
        payload: bio
    }
};

export const fullNameChanged = (fullName) => {
    return {
        type: Actions.FULL_NAME_CHANGED,
        payload: fullName
    }
};

export const reset = () => ({type: Actions.SIGN_UP_COMPLETE_RESET});

export const signUpUser = (email, password, username, fullName, bio) => {
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
                    fullname: fullName,
                    bio: bio
                }
            }
        }
    };
};