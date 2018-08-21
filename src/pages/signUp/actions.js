export const Actions = {
    EMAIL_CHANGED: 'SIGN_UP_EMAIL_CHANGED',
    PASSWORD_CHANGED: 'SIGN_UP_PASSWORD_CHANGED',
    REPEATED_PASSWORD_CHANGED: 'REPEATED_PASSWORD_CHANGED',
    MODE_CHANGED: 'SIGN_UP_MODE_CHANGED',
    SIGN_UP_FAIL: 'SIGN_UP_FAIL',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP: 'SIGN_UP',
    ENTER_LOGIN: 'ENTER_LOGIN',
    SIGN_IN_FROM_OTHER_ACCOUNTS: 'SIGN_UP_SIGN_IN_FROM_OTHER_ACCOUNTS',
    SIGN_UP_RESET: 'SIGN_UP_RESET'
};

export const emailChanged = (email) => {
    return {
        type: Actions.EMAIL_CHANGED,
        payload: email
    }
};

export const passwordChanged = (password) => {
    return {
        type: Actions.PASSWORD_CHANGED,
        payload: password
    }
};

export const repeatedPasswordChanged = (password) => {
    return {
        type: Actions.REPEATED_PASSWORD_CHANGED,
        payload: password
    }
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const reset = () => ({type: Actions.SIGN_UP_RESET});

export const signUpUser = (email, password) => {
    return {
        type: Actions.SIGN_UP,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/signup/',
                data: {
                    email: email,
                    password: password
                }
            }
        }
    };
};