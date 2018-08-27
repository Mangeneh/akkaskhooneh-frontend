import {UserInfoActions} from '../actions/UserInfoActions';

const INITIAL_STATE = {
    user: {},
    accessToken: '',
    refreshToken: '',
};

export default (state = INITIAL_STATE, action) => {
    const {UPDATE_ACCESS_TOKEN_SUCCESS, UPDATE_USER_SUCCESS, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SIGN_OUT} = UserInfoActions;
    switch (action.type) {
        case UPDATE_USER_SUCCESS:
            return {...state, user: action.payload.data};
        case UPDATE_ACCESS_TOKEN_SUCCESS:
            return {...state, accessToken: action.payload.data.access};
        case SET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload};
        case SET_REFRESH_TOKEN:
            return {...state, refreshToken: action.payload};
        case SIGN_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}