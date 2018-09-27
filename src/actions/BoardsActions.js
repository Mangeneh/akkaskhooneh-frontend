import { RequestMethods, Server } from '../config';

export const BoardsActions = {
  ADD_POST_TO_BOARD: 'ADD_POST_TO_BOARD',
  ADD_POST_TO_BOARD_SUCCESS: 'ADD_POST_TO_BOARD_SUCCESS',
  ADD_POST_TO_BOARD_FAIL: 'ADD_POST_TO_BOARD_FAIL',
  CREATE_BOARD: 'CREATE_BOARD',
  CREATE_BOARD_SUCCESS: 'CREATE_BOARD_SUCCESS',
  CREATE_BOARD_FAIL: 'CREATE_BOARD_FAIL',
  DELETE_BOARD: 'DELETE_BOARD',
  DELETE_BOARD_SUCCESS: 'DELETE_BOARD_SUCCESS',
  DELETE_BOARD_FAIL: 'DELETE_BOARD_FAIL',
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
