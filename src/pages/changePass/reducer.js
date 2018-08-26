import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.DISABLED,
    previousPassword: '',
    newPassword: '',
    repeatedPassword: '',
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED, PREVIOUS_PASSWORD_CHANGED, NEW_PASSWORD_CHANGED, REPEATED_PASSWORD_CHANGED} = Actions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case PREVIOUS_PASSWORD_CHANGED:
            return {...state, previousPassword: action.payload};
        case NEW_PASSWORD_CHANGED:
            return {...state, newPassword: action.payload};
        case REPEATED_PASSWORD_CHANGED:
            return {...state, repeatedPassword: action.payload};
        default:
            return state;
    }
}