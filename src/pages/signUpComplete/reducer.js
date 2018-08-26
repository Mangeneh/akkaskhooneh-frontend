import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.NORMAL,
    image: null,
};

export default (state = INITIAL_STATE, action) => {
    const {MODE_CHANGED, IMAGE_CHANGED} = Actions;
    switch (action.type) {
        case MODE_CHANGED:
            return {...state, mode: action.payload};
        case IMAGE_CHANGED:
            return {...state, image: action.payload};
        default:
            return state;
    }
}