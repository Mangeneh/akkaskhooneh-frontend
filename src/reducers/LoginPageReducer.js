import {EMAIL_CHANGED, PASSWORD_CHANGED, MODE_CHANGED,LOGIN_FAIL} from '../actions/LoginPageActions';
import { LoginPageModes} from "../config/LoginPageModes";

const INITIAL_STATE = {
    email: '',
    password: '',
    mode: LoginPageModes.DISABLED
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case LOGIN_FAIL:
            return {...state,mode:LoginPageModes.ERROR};
        default:
            return state;
    }
}