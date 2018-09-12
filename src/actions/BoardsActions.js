import { RequestMethods, Server } from '../config';

export const BoardsActions = {
  GET_USER_BOARDS_NEXT_PAGE: 'GET_USER_BOARDS_NEXT_PAGE',
  GET_USER_BOARDS_NEXT_PAGE_SUCCESS: 'GET_USER_BOARDS_NEXT_PAGE_SUCCESS',
  GET_USER_BOARDS_NEXT_PAGE_FAIL: 'GET_USER_BOARDS_NEXT_PAGE_FAIL',
  //
  ADD_POST_TO_BOARD: 'ADD_POST_TO_BOARD',
  ADD_POST_TO_BOARD_SUCCESS: 'ADD_POST_TO_BOARD_SUCCESS',
  ADD_POST_TO_BOARD_FAIL: 'ADD_POST_TO_BOARD_FAIL',
  //
  CREATE_BOARD: 'CREATE_BOARD',
  CREATE_BOARD_SUCCESS: 'CREATE_BOARD_SUCCESS',
  CREATE_BOARD_FAIL: 'CREATE_BOARD_FAIL',
  //
  DELETE_BOARD: 'DELETE_BOARD',
  DELETE_BOARD_SUCCESS: 'DELETE_BOARD_SUCCESS',
  DELETE_BOARD_FAIL: 'DELETE_BOARD_FAIL',
  //
  REFRESH_USER_BOARDS: 'REFRESH_USER_BOARDS',
  REFRESH_USER_BOARDS_SUCCESS: 'REFRESH_USER_BOARDS_SUCCESS',
  REFRESH_USER_BOARDS_FAIL: 'REFRESH_USER_BOARDS_FAIL',
};

export const refreshUserBoards = (username) => {
  const url = username ? `${Server.GET_BOARDS_NEXT_PAGE}${username}/?page=1`
    : `${Server.GET_BOARDS_NEXT_PAGE}?page=1`;
  return {
    type: BoardsActions.REFRESH_USER_BOARDS,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const getUserBoardsNextPage = (boardsNext, username) => {
  const url = username ? `${Server.GET_BOARDS_NEXT_PAGE}${username}/?page=${boardsNext}`
    : `${Server.GET_BOARDS_NEXT_PAGE}?page=1`;
  return {
    type: BoardsActions.GET_USER_BOARDS_NEXT_PAGE,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

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
      postID,
      boardID,
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
      boardID,
    },
  },
});
