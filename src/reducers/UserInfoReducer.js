import {UserInfoActions} from '../actions/UserInfoActions';
import GlobalActions from "../actions";

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
        case GlobalActions.RESET_EVERYTHING:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const selectSelfEmail = (state) => state.userInfo.user.email;
export const selectSelfUsername = (state) => state.userInfo.user.username;
export const selectSelfBio = (state) => state.userInfo.user.bio;
export const selectSelfFullName = (state) => state.userInfo.user.fullname;
export const selectSelfNumOfFollowers = (state) => state.userInfo.user.followers;
export const selectSelfNumOfFollowings = (state) => state.userInfo.user.following;
export const selectSelfProfilePicture = (state) => state.userInfo.user.profile_picture;
export const selectAccessToken = (state) => state.userInfo.accessToken;
export const selectRefreshToken = (state) => state.userInfo.refreshToken;
export const selectLastRefreshTime = (state) => state.userInfo.lastRefreshTime;