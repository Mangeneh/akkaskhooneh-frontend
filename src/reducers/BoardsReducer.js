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
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...INITIAL_USER_BOARDS_STATE,
          ...state[userField],
          userBoardsIsRefreshing: true,
        },
      };
    }
    case REFRESH_USER_BOARDS_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userBoards: action.payload.data.results,
          userBoardsTotalPages: action.payload.data.total_pages,
          userBoardsNextPage: 2,
          userBoardsIsFirstFetch: false,
          userBoardsIsRefreshing: false,
        },
      };
    }
    case GET_USER_BOARDS_NEXT_PAGE: {
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userBoardsIsLoading: true,
        },
      };
    }
    case GET_USER_BOARDS_NEXT_PAGE_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userBoards: state[userField].concat(action.payload.data.results),
          userBoardsTotalPages: action.payload.data.total_pages,
          userBoardsNextPage: state[userField].userBoardsNextPage + 1,
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

export const selectBoards = state => state.boards;

const createUserBadge = username => username || 'me';

const checkUserProperty = (state, username) => _.has(selectBoards(state), createUserBadge(username));
const getUserProperty = (state, username) => {
  const boardProperty = createUserBadge(username);
  if (checkUserProperty(state, username)) {
    return selectBoards(state)[boardProperty];
  }
  return INITIAL_USER_BOARDS_STATE;
};
export const selectUserBoards = (state, username) => getUserProperty(state, username).userBoards;
export const selectUserBoardsTotalPages = (state, username) => getUserProperty(state, username).userBoardsTotalPages;
export const selectUserBoardsNextPage = (state, username) => getUserProperty(state, username).userBoardsNextPage;
export const selectUserBoardsIsRefreshing = (state, username) => getUserProperty(state, username).userBoardsIsRefreshing;
export const selectUserBoardsIsFirstFetch = (state, username) => getUserProperty(state, username).userBoardsIsFirstFetch;
export const selectUserBoardsIsLoading = (state, username) => getUserProperty(state, username).userBoardsIsLoading;
