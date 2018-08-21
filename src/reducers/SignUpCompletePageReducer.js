import {SignUpCompletePageActions} from '../actions/SignUpCompletePageActions';
import {SaveInfoMode} from "../config/SaveInfoMode";

const INITIAL_STATE = {
    mode: SaveInfoMode.NORMAL
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED} = SignUpCompletePageActions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        default:
            return state;
    }
}