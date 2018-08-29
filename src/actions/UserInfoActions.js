import {Server} from '../config';

export const UserInfoActions = {
    UPDATE_ACCESS_TOKEN: 'UPDATE_ACCESS_TOKEN',
    UPDATE_ACCESS_TOKEN_SUCCESS: 'UPDATE_ACCESS_TOKEN_SUCCESS',
    SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
    SIGN_OUT: 'SIGN_OUT',
};

export const refreshTokenSet = (refreshToken) => {
    return {
        type: UserInfoActions.SET_REFRESH_TOKEN,
        payload: refreshToken
    }
};

export const accessTokenSet = (accessToken) => {
    return {
        type: UserInfoActions.SET_ACCESS_TOKEN,
        payload: accessToken
    }
};

export const reset = () => ({type: UserInfoActions.SIGN_OUT});

export const userUpdated = () => {
    return {
        type: UserInfoActions.UPDATE_USER,
        payload: {
            request: {
                method: 'GET',
                url: Server.UPDATE_USER
            }
        }
    }
};

export const accessTokenUpdated = (refreshToken) => {
    return {
        type: UserInfoActions.UPDATE_ACCESS_TOKEN,
        payload: {
            request: {
                method: 'POST',
                url: Server.UPDATE_ACCESS_TOKEN,
                data: {
                    refresh: refreshToken,
                }
            }
        }
    }
};