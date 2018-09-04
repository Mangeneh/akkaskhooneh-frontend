import {RequestMethods, Server} from "../config";

export const BoardsActions = {
    GET_SELF_BOARDS_NEXT_PAGE: 'GET_SELF_BOARDS_NEXT_PAGE',
    GET_SELF_BOARDS_NEXT_PAGE_SUCCESS: 'GET_SELF_BOARDS_NEXT_PAGE_SUCCESS',
    GET_SELF_BOARDS_NEXT_PAGE_FAIL: 'GET_SELF_BOARDS_NEXT_PAGE_FAIL',
    RESET_SELF_BOARDS: 'RESET_SELF_BOARDS',
    GET_OTHERS_BOARDS_NEXT_PAGE: 'GET_OTHERS_BOARDS_NEXT_PAGE',
    GET_OTHERS_BOARDS_NEXT_PAGE_SUCCESS: 'GET_OTHERS_BOARDS_NEXT_PAGE_SUCCESS',
    GET_OTHERS_BOARDS_NEXT_PAGE_FAIL: 'GET_OTHERS_BOARDS_NEXT_PAGE_FAIL',
    RESET_OTHERS_BOARDS: 'RESET_OTHERS_BOARDS',
};

export const getSelfBoardsNextPage = (boardsNext) => {
    return {
        type: BoardsActions.GET_SELF_BOARDS_NEXT_PAGE,
        payload: {
            request: {
                method: RequestMethods.GET,
                url: `${Server.GET_SELF_BOARDS_NEXT_PAGE}${boardsNext}`,
            }
        }
    };
};