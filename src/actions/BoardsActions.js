import { RequestMethods, Server } from '../config';

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
  CHANGE_SELECTED_POST_ID: 'FEED_ADD_CHANGE_SELECTED_POST_ID',
  CREATE_BOARD_FAIL: 'CREATE_BOARD_FAIL',
  CREATE_BOARD_SUCCESS: 'CREATE_BOARD_SUCCESS',
  CREATE_BOARD: 'CREATE_BOARD',
  DELETE_BOARD: 'DELETE_BOARD',
  DELETE_BOARD_SUCCESS: 'DELETE_BOARD_SUCCESS',
  DELETE_BOARD_FAIL: 'DELETE_BOARD_FAIL',
  REFRESH: 'REFRESH_BOARDS',
  REFRESH_SUCCESS: 'REFRESH_BOARDS_SUCCESS',
  REFRESH_FAIL: 'REFRESH_BOARDS_FAIL',
};

export const resetSelfBoards = () => ({
  type: BoardsActions.RESET_SELF_BOARDS,
});

export const selectedPostChanged = selectedPostID => ({
  type: BoardsActions.CHANGE_SELECTED_POST_ID,
  payload: selectedPostID,
});

export const refreshBoards = () => ({
  type: BoardsActions.REFRESH,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SELF_BOARDS_NEXT_PAGE}1`,
    },
  },
});

export const getSelfBoardsNextPage = boardsNext => ({
  type: BoardsActions.GET_SELF_BOARDS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SELF_BOARDS_NEXT_PAGE}${boardsNext}`,
    },
  },
});

export const addPostToBoard = (postID, boardID) => ({
  type: BoardsActions.ADD_POST_TO_BOARD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.ADD_POST_TO_BOARD,
      data: {
        board_id: boardID,
        post_id: postID,
      },
    },
  },
});

export const createBoard = boardName => ({
  type: BoardsActions.CREATE_BOARD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.CREATE_BOARD,
      data: {
        name: boardName,
      },
    },
  },
});

export const deleteBoard = boardID => ({
  type: BoardsActions.DELETE_BOARD,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.DELETE_BOARD,
      data: {
        board_id: boardID,
      },
    },
  },
});
