import {BoardsActions} from '../actions/BoardsActions';

const INITIAL_SELF_BOARDS_STATE = {
    selfBoards: [],
    selfBoardsNextPage: 1,
    selfBoardsTotalPages: 1,
    selfBoardsIsLoading: false
};

const INITIAL_OTHERS_BOARDS_STATE = {
    othersBoards: [],
    othersBoardsNextPage: 1,
    othersBoardsTotalPages: 1,
    othersBoardsIsLoading: false
};

const INITIAL_STATE = {
    ...INITIAL_SELF_BOARDS_STATE,
    ...INITIAL_OTHERS_BOARDS_STATE
};

export default (state = INITIAL_STATE, action) => {
    const {RESET_SELF_BOARDS, GET_SELF_BOARDS_NEXT_PAGE_SUCCESS, GET_SELF_BOARDS_NEXT_PAGE, GET_SELF_BOARDS_NEXT_PAGE_FAIL} = BoardsActions;
    switch (action.type) {
        case GET_SELF_BOARDS_NEXT_PAGE_SUCCESS:
            return {
                ...state,
                selfBoards: state.selfBoards.concat(action.payload.data.results),
                selfBoardsTotalPages: action.payload.data.total_pages,
                selfBoardsNextPage: state.selfBoardsNextPage + 1,
                selfBoardsIsLoading: false
            };
        case RESET_SELF_BOARDS:
            return {
                ...state,
                ...INITIAL_SELF_BOARDS_STATE
            };
        default:
            return state;
    }
}

export const selectSelfBoards = (state) => state.boards.selfBoards;
export const selectSelfBoardsTotalPages = (state) => state.boards.selfBoardsTotalPages;
export const selectSelfBoardsNextPage = (state) => state.boards.selfBoardsNextPage;
export const selectSelfBoardsIsLoading = (state) => state.boards.selfBoardsIsLoading;