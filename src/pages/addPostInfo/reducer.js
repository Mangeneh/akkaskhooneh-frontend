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
            console.log(action);
            return state;
        case Actions.SEND_POST_FAIL:
            console.log(action);
            return state;
        case Actions.SEND_POST_SUCCESS:
            console.log(action);
            return state;
        default:
            return state;
    }
}