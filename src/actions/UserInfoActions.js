export const UserInfoActions = {
    USER_INFO_CHANGED: 'USER_INFO_CHANGED',
    CHECK_TOKEN: 'CHECK_TOKEN',
    UPDATE_TOKEN: 'UPDATE_TOKEN',
    UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS',
};

export const userInfoChanged = (userInfo) => {
    return {
        type: UserInfoActions.USER_INFO_CHANGED,
        payload: userInfo
    }
};

export const checkToken = () => {
    return {
        type: UserInfoActions.CHECK_TOKEN
    }
};

export const updateToken = (oldToken) => {
    return {
        type: UserInfoActions.UPDATE_TOKEN,
        payload: {
            request: {
                method: 'POST',
                url: '/auth/login/', // todo update url
                data: {
                    token: oldToken,
                }
            }
        }
    }
};