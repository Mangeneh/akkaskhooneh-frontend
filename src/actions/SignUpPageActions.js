export const SignUpPageActions = {
    EMAIL_CHANGED: 'EMAIL_CHANGED',
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    REPEATED_PASSWORD_CHANGED: 'REPEATED_PASSWORD_CHANGED',
    MODE_CHANGED: 'MODE_CHANGED',
    SIGN_UP_FAIL: 'SIGN_UP_FAIL',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP: 'SIGN_UP',
    ENTER_LOGIN: 'ENTER_LOGIN',
    SIGN_IN_FROM_OTHER_ACCOUNTS: 'SIGN_IN_FROM_OTHER_ACCOUNTS',
};

export const emailChanged = (email) => {
    return {
        type: SignUpPageActions.EMAIL_CHANGED,
        payload: email
    }
};

export const passwordChanged = (password) => {
    return {
        type: SignUpPageActions.PASSWORD_CHANGED,
        payload: password
    }
};

export const repeatedPasswordChanged = (password) => {
    return {
        type: SignUpPageActions.REPEATED_PASSWORD_CHANGED,
        payload: password
    }
};

export const modeChanged = (mode) => {
    return {
        type: SignUpPageActions.MODE_CHANGED,
        payload: mode
    }
};

export const signUpUser = (email, password) => {
    return {
        type: 'SIGN_UP',
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