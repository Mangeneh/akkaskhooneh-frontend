import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    selectedPics: [],
    mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
    const {PIC_SELECTED} = Actions;
    switch (action.type) {
        case PIC_SELECTED:
            return {...state, selectedPics: action.payload};
        default:
            return state;
    }
}