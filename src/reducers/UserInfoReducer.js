import {UserInfoActions} from '../actions/UserInfoActions';

const INITIAL_STATE = {
    email: '',
    refreshToken: '',
    accessToken: ''
};

export default (state = INITIAL_STATE, action) => {
    const {USER_INFO_CHANGED, UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS} = UserInfoActions;
    switch (action.type) {
        case USER_INFO_CHANGED:
            return {...state, ...action.payload};
        case UPDATE_TOKEN_SUCCESS:
            return {...state, accessToken: action.payload};
        default:
            return state;
    }
}