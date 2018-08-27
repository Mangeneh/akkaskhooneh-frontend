import {Actions} from './actions';
import {PageModes} from "../../config";

const INITIAL_STATE = {
    mode: Actions.NORMAL,
    image: null,
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED, IMAGE_CHANGED, EDIT_PROFILE, EDIT_PROFILE_FAIL, EDIT_PROFILE_SUCCESS} = Actions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case IMAGE_CHANGED:
            return {...state, image: action.payload};
        case EDIT_PROFILE:
            return {...state, mode: PageModes.LOADING};
        case EDIT_PROFILE_SUCCESS:
            return {...state, mode: PageModes.SUCCESS};
        case EDIT_PROFILE_FAIL:
            return {...state, mode: PageModes.ERROR};
        default:
            return state;
    }
}