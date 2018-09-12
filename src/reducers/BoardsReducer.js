import _ from 'lodash';
import { BoardsActions, UsersActions } from '../actions';

const INITIAL_USER_BOARDS_STATE = {
  userBoards: [],
  userBoardsNextPage: 1,
  userBoardsTotalPages: 1,
  userBoardsIsFirstFetch: true,
  userBoardsIsRefreshing: false,
  userBoardsIsLoading: false,
};

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_USER_BOARDS_NEXT_PAGE,
    GET_USER_BOARDS_NEXT_PAGE_SUCCESS,
    //
    REFRESH_USER_BOARDS,
    REFRESH_USER_BOARDS_SUCCESS,
    //
  } = BoardsActions;
  switch (action.type) {
    case REFRESH_USER_BOARDS: {
      const boardField = createBoardBadge(action.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...INITIAL_USER_BOARDS_STATE,
          ...state[boardField],
          userBoardsIsRefreshing: true,
        },
      };
    }
    case REFRESH_USER_BOARDS_SUCCESS: {
      const boardField = createBoardBadge(action.meta.previousAction.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          userBoards: action.payload.data.results,
          userBoardsTotalPages: action.payload.data.total_pages,
          userBoardsNextPage: 2,
          userBoardsIsFirstFetch: false,
          userBoardsIsRefreshing: false,
        },
      };
    }
    case GET_USER_BOARDS_NEXT_PAGE: {
      const boardField = createBoardBadge(action.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          userBoardsIsLoading: true,
        },
      };
    }
    case GET_USER_BOARDS_NEXT_PAGE_SUCCESS: {
      const boardField = createBoardBadge(action.meta.previousAction.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          userBoards: state[boardField].concat(action.payload.data.results),
          userBoardsTotalPages: action.payload.data.total_pages,
          userBoardsNextPage: state[boardField].userBoardsNextPage + 1,
          userBoardsIsLoading: false,
        },
      };
    }
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const createBoardBadge = boardID => `board${boardID}`;

const checkBoardProperty = (state, boardID) => _.has(state.boards, createBoardBadge(boardID));
const getBoardProperty = (state, boardID) => {
  const boardProperty = createBoardBadge(boardID);
  if (checkBoardProperty(state, boardID)) {
    return state.boards[boardProperty];
  }
  return INITIAL_USER_BOARDS_STATE;
};
export const selectUserBoards = (state, boardID) => getBoardProperty(state, boardID).userBoards;
export const selectUserBoardsTotalPages = (state, boardID) => getBoardProperty(state, boardID).userBoardsTotalPages;
export const selectUserBoardsNextPage = (state, boardID) => getBoardProperty(state, boardID).userBoardsNextPage;
export const selectUserBoardsIsRefreshing = (state, boardID) => getBoardProperty(state, boardID).userBoardsIsRefreshing;
export const selectUserBoardsIsFirstFetch = (state, boardID) => getBoardProperty(state, boardID).userBoardsIsFirstFetch;
export const selectUserBoardsIsLoading = (state, boardID) => getBoardProperty(state, boardID).userBoardsIsLoading;
