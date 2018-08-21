import {Actions} from './actions';
import {PageModes} from "../../config/PageModes";

const INITIAL_STATE = {
    email: '',
    password: '',
    mode: PageModes.DISABLED
};

export default (state = INITIAL_STATE, action) => {
    const {EMAIL_CHANGED,LOGIN_RESET, PASSWORD_CHANGED, MODE_CHANGED, LOGIN_FAIL, LOGIN, LOGIN_SUCCESS} = Actions;
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case LOGIN:
            return {...state, mode: 'LOADING'};
        case LOGIN_FAIL:
            return {...state, mode: PageModes.ERROR};
        case LOGIN_SUCCESS:
            return {...state, mode: PageModes.NORMAL};
        case LOGIN_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}