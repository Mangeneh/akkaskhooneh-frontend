import axios from "axios";

export const LoginPageActions = {
    EMAIL_CHANGED: 'EMAIL_CHANGED',
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    MODE_CHANGED: 'MODE_CHANGED',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN: 'LOGIN',
    ENTER_SIGN_UP: 'ENTER_SIGN_UP',
    SIGN_IN_FROM_OTHER_ACCOUNTS: 'SIGN_IN_FROM_OTHER_ACCOUNTS',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};

export const emailChanged = (email) => {
    return {
        type: LoginPageActions.EMAIL_CHANGED,
        payload: email
    }
};

export const passwordChanged = (password) => {
    return {
        type: LoginPageActions.PASSWORD_CHANGED,
        payload: password
    }
};

export const modeChanged = (mode) => {
    return {
        type: LoginPageActions.MODE_CHANGED,
        payload: mode
    }
};

export const loginUser = (email, password) => {
    return {
        type: 'LOGIN',
        payload: {
            request: {
                method: 'POST',
                url: '/auth/login/',
                data: {
                    email: email,
                    password: password
                }
            }
        }
    };
};