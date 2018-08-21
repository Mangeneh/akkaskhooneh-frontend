import {ProfileEditPageActions} from '../actions/ProfileEditPageActions';
import {SaveModes} from "../config/SaveModes";

const INITIAL_STATE = {
    mode: SaveModes.NORMAL
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