import {UserInfoActions} from '../actions/UserInfoActions';

const INITIAL_STATE = {
    email: '',
    token: '',
    lastTokenUpdateTime: Date.now(),
    shouldUpdateToken: false
};

export default (state = INITIAL_STATE, action) => {
    const {USER_INFO_CHANGED, UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS, CHECK_TOKEN} = UserInfoActions;
    switch (action.type) {
        case USER_INFO_CHANGED:
            return {...state, ...action.payload};
        case CHECK_TOKEN:
            if ((Date.now() - state.lastTokenUpdateTime) > 5000) {
                return {...state, shouldUpdateToken: true};
            }
            return state;
        case UPDATE_TOKEN_SUCCESS:
        return {...state, token: action.payload, lastTokenUpdateTime: Date.now(), shouldUpdateToken: false};
        default:
            return state;
    }
}