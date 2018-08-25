import {Actions} from './actions';
import {PageModes} from "../../config/PageModes";

const INITIAL_STATE = {
    mode: PageModes.NORMAL
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