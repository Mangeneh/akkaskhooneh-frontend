import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
    const {TAG_CHANGED, TAGS_LIST_CHANGED} = Actions;
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