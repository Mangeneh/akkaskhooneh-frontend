import {EMAIL_CHANGED, PASSWORD_CHANGED, MODE_CHANGED} from '../actions/LoginPageActions';

const INITIAL_STATE = {
    email: '',
    password: '',
    mode: 'NORMAL'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        default:
            return state;
    }
}