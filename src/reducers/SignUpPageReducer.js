import {SignUpPageActions} from '../actions/SignUpPageActions';
import {LoginPageModes} from "../config/LoginPageModes";

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatedPassword: '',
    mode: LoginPageModes.DISABLED
};

export default (state = INITIAL_STATE, action) => {
    const {EMAIL_CHANGED, PASSWORD_CHANGED, REPEATED_PASSWORD_CHANGED,MODE_CHANGED, SIGN_UP_FAIL, SIGN_UP, SIGN_UP_SUCCESS} = SignUpPageActions;
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case REPEATED_PASSWORD_CHANGED:
            return {...state, repeatedPassword: action.payload};
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case SIGN_UP:
            return {...state, mode: 'LOADING'};
        case SIGN_UP_FAIL:
            return {...state, mode: LoginPageModes.ERROR};
        case SIGN_UP_SUCCESS:
            return {...state, mode: LoginPageModes.NORMAL};
        default:
            return state;
    }
}