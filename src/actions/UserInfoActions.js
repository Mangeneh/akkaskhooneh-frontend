export const UserInfoActions = {
    USER_INFO_CHANGED: 'USER_INFO_CHANGED',
    UPDATE_TOKEN: 'UPDATE_TOKEN',
};

export const userInfoChanged = (userInfo) => {
    return {
        type: UserInfoActions.USER_INFO_CHANGED,
        payload: userInfo
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