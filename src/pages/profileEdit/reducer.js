import {Actions} from './actions';

const INITIAL_STATE = {
    mode: Actions.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED} = Actions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        default:
            return state;
    }
}