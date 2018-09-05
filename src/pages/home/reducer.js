import {Actions} from './actions';

const INITIAL_STATE = {
    boardName: '',
};

export default (state = INITIAL_STATE, action) => {
    const {BOARD_NAME_CHANGED, } = Actions;
    switch (action.type) {
        case BOARD_NAME_CHANGED:
            return {...state, boardName: action.payload};
        default:
            return state;
    }
}

// export const selectBoardN