import {ProfileEditPageActions} from '../actions/ProfileEditPageActions';

const INITIAL_STATE = {
    mode: ProfileEditPageActions.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED} = ProfileEditPageActions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        default:
            return state;
    }
}