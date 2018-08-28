import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatedPassword: '',
    mode: PageModes.DISABLED
};

export default (state = INITIAL_STATE, action) => {
    const {EMAIL_CHANGED, SIGN_UP_RESET, PASSWORD_CHANGED, REPEATED_PASSWORD_CHANGED, MODE_CHANGED, VALIDATE_EMAIL, VALIDATE_EMAIL_FAIL, VALIDATE_EMAIL_SUCCESS} = Actions;
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case REPEATED_PASSWORD_CHANGED:
            return {...state, repeatedPassword: action.payload};
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case VALIDATE_EMAIL:
            return {...state, mode: PageModes.LOADING};
        case VALIDATE_EMAIL_FAIL:
            return {...state, mode: PageModes.ERROR};
        case VALIDATE_EMAIL_SUCCESS:
            return {...state, mode: PageModes.NORMAL};
        case SIGN_UP_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}