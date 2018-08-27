import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.DISABLED,
    previousPassword: '',
    newPassword: '',
    repeatedPassword: '',
};

export default (state = INITIAL_STATE, action) => {
    const {CHANGE_PASS_RESET, MODE_CHANGED, PREVIOUS_PASSWORD_CHANGED, NEW_PASSWORD_CHANGED, REPEATED_PASSWORD_CHANGED, CHANGE_PASS, CHANGE_PASS_FAIL, CHANGE_PASS_SUCCESS} = Actions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case PREVIOUS_PASSWORD_CHANGED:
            return {...state, previousPassword: action.payload};
        case NEW_PASSWORD_CHANGED:
            return {...state, newPassword: action.payload};
        case REPEATED_PASSWORD_CHANGED:
            return {...state, repeatedPassword: action.payload};
        case CHANGE_PASS:
            return {...state, mode: PageModes.LOADING};
        case CHANGE_PASS_FAIL:
            return {...state, mode: PageModes.ERROR};
        case CHANGE_PASS_SUCCESS:
            return {...state, mode: PageModes.NORMAL};
        case CHANGE_PASS_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
}