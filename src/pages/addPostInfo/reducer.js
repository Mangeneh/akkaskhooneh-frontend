import {Actions} from './actions';
import {PageModes} from '../../config';

const INITIAL_STATE = {
    mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}