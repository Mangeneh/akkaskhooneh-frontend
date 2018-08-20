import axios from "axios";

export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const MODE_CHANGED = 'MODE_CHANGED';
export const LOGIN = 'LOGIN';
export const ENTER_SIGN_UP = 'ENTER_SIGN_UP';
export const SIGN_IN_FROM_OTHER_ACCOUNTS = 'SIGN_IN_FROM_OTHER_ACCOUNTS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
};

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
};

export const modeChanged = (mode) => {
    return {
        type: MODE_CHANGED,
        payload: mode
    }
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        console.warn("action delivered")

        return axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(data => {
                console.warn("action delivered")
            })
    };
};