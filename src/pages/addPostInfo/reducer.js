import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.NORMAL,
    tags: [],
    currentTag: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.SEND_POST:
            return {...state, mode: PageModes.LOADING};
        case Actions.SEND_POST_FAIL:
            return {...state, mode: PageModes.ERROR};
        case Actions.SEND_POST_SUCCESS:
            return {...state, mode: PageModes.SUCCESS};
        default:
            return state;
    }
}