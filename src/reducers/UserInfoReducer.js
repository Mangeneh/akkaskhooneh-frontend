import {UserInfoActions} from '../actions/UserInfoActions';

const INITIAL_STATE = {
    user: {},
    accessToken: '',
    refreshToken: '',
    lastRefreshTime: 0
};

export default (state = INITIAL_STATE, action) => {
    const {UPDATE_ACCESS_TOKEN_SUCCESS, UPDATE_USER_SUCCESS, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SIGN_OUT} = UserInfoActions;
    switch (action.type) {
        case UPDATE_USER_SUCCESS:
            return {...state, user: action.payload.data};
        case UPDATE_ACCESS_TOKEN_SUCCESS:
            return {...state, accessToken: action.payload.data.access, lastRefreshTime: Date.now()};
        case SET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload, lastRefreshTime: Date.now()};
        case SET_REFRESH_TOKEN:
            return {...state, refreshToken: action.payload};
        case SIGN_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const getSelfEmail = (state) => state.userInfo.user.email;
export const getSelfUsername = (state) => state.userInfo.user.username;
export const getSelfBio = (state) => state.userInfo.user.bio;
export const getSelfFullName = (state) => state.userInfo.user.fullname;
export const getSelfNumOfFollowers = (state) => state.userInfo.user.followers;
export const getSelfNumOfFollowings = (state) => state.userInfo.user.following;
export const getSelfProfilePicture = (state) => state.userInfo.user.profile_picture;