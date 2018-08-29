import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    email: '',
    password: '',
    repeatedPassword: '',
    mode: PageModes.DISABLED,
    toolTipVisible: false, 
};

export default (state = INITIAL_STATE, action) => {
    const {EMAIL_CHANGED, PASSWORD_FIELD_PRESSED, SIGN_UP_RESET, PASSWORD_CHANGED, REPEATED_PASSWORD_CHANGED, MODE_CHANGED, VALIDATE_EMAIL, VALIDATE_EMAIL_FAIL, VALIDATE_EMAIL_SUCCESS, EMAIL_RESET} = Actions;
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        // case PASSWORD_FIELD_PRESSED:
        //     return {...state, toolTipVisible: true}
        case PASSWORD_CHANGED:
            return {...state, password: action.payload, toolTipVisible: action.payload === '' ? true : false};
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
        case EMAIL_RESET:
            return {...state, email: '', mode: PageModes.DISABLED};
        case SIGN_UP_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}