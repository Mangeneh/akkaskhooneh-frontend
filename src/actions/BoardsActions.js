import {RequestMethods, Server} from "../config";

export const BoardsActions = {
    GET_SELF_BOARDS_NEXT_PAGE: 'GET_SELF_BOARDS_NEXT_PAGE',
    GET_SELF_BOARDS_NEXT_PAGE_SUCCESS: 'GET_SELF_BOARDS_NEXT_PAGE_SUCCESS',
    GET_SELF_BOARDS_NEXT_PAGE_FAIL: 'GET_SELF_BOARDS_NEXT_PAGE_FAIL',
    ADD_POST_TO_BOARD: 'ADD_POST_TO_BOARD',
    ADD_POST_TO_BOARD_SUCCESS: 'ADD_POST_TO_BOARD_SUCCESS',
    ADD_POST_TO_BOARD_FAIL: 'ADD_POST_TO_BOARD_FAIL',
    RESET_SELF_BOARDS: 'RESET_SELF_BOARDS',
    GET_OTHERS_BOARDS_NEXT_PAGE: 'GET_OTHERS_BOARDS_NEXT_PAGE',
    GET_OTHERS_BOARDS_NEXT_PAGE_SUCCESS: 'GET_OTHERS_BOARDS_NEXT_PAGE_SUCCESS',
    GET_OTHERS_BOARDS_NEXT_PAGE_FAIL: 'GET_OTHERS_BOARDS_NEXT_PAGE_FAIL',
    RESET_OTHERS_BOARDS: 'RESET_OTHERS_BOARDS',
    CHANGE_SELECTED_BOARD_ID: 'FEED_ADD_CHANGE_SELECTED_BOARD_ID',
    CHANGE_SELECTED_POST_ID: 'FEED_ADD_CHANGE_SELECTED_POST_ID',
};

export const selectedBoardChanged = (selectedBoardID) => {
    return {
        type: BoardsActions.CHANGE_SELECTED_BOARD_ID,
        payload: selectedBoardID
    }
};

export const selectedPostChanged = (selectedPostID) => {
    return {
        type: BoardsActions.CHANGE_SELECTED_POST_ID,
        payload: selectedPostID
    }
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

export const addPostToBoard = (postID, boardID) => {
    return {
        type: BoardsActions.ADD_POST_TO_BOARD,
        payload: {
            request: {
                method: RequestMethods.POST,
                url: Server.ADD_POST_TO_BOARD,
                data: {
                    board_id: boardID,
                    post_id: postID,
                }
            }
        }
    };
};