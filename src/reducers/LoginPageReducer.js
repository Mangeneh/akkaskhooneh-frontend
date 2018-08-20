import {LoginPageActions} from '../actions/LoginPageActions';
import {LoginPageModes} from "../config/LoginPageModes";

const INITIAL_STATE = {
    email: '',
    password: '',
    mode: LoginPageModes.DISABLED
};

export default (state = INITIAL_STATE, action) => {
    const {EMAIL_CHANGED, PASSWORD_CHANGED, MODE_CHANGED, LOGIN_FAIL, LOGIN, LOGIN_SUCCESS} = LoginPageActions;
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
            console.warn(action.error);
            return {...state, mode: LoginPageModes.ERROR};
        case LOGIN_SUCCESS:
            console.warn("Success");
            return {...state, mode: LoginPageModes.NORMAL};
        default:
            return state;
    }
}