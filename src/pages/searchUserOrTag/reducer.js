import { UsersActions } from '../../actions';
import { SearchUserOrTagActions } from './actions';

const INITIAL_SEARCH_USERS_STATE = {
  searchUsers: [],
  searchUsersNextPage: 1,
  searchUsersTotalPages: 1,
  searchUsersIsLoading: false,
};

const INITIAL_SEARCH_TAGS_STATE = {
  searchTags: [],
  searchTagsNextPage: 1,
  searchTagsTotalPages: 1,
  searchTagsIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_SEARCH_USERS_STATE,
  ...INITIAL_SEARCH_TAGS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_SEARCH_USERS_NEXT_PAGE,
    GET_SEARCH_USERS_NEXT_PAGE_FAIL,
    GET_SEARCH_USERS_NEXT_PAGE_SUCCESS,
    RESET_SEARCH_USERS,
    REFRESH_SEARCH_USERS,
    GET_SEARCH_TAGS_NEXT_PAGE,
    GET_SEARCH_TAGS_NEXT_PAGE_FAIL,
    GET_SEARCH_TAGS_NEXT_PAGE_SUCCESS,
    RESET_SEARCH_TAGS,
    REFRESH_SEARCH_TAGS,
    REFRESH_SEARCH_USERS_SUCCESS,
    REFRESH_SEARCH_USERS_FAIL,
    REFRESH_SEARCH_TAGS_SUCCESS,
    REFRESH_SEARCH_TAGS_FAIL,
    START_NEW_SEARCH,
  } = SearchUserOrTagActions;
  switch (action.type) {
    case START_NEW_SEARCH:
      return {
        ...state,
        searchTagsNextPage: 1,
        searchUsersNextPage: 1,
      };
    case GET_SEARCH_USERS_NEXT_PAGE:
      return {
        ...state,
        searchUsersIsLoading: true,
      };
    case GET_SEARCH_USERS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchUsers: state.searchUsers.concat(action.payload.data.results),
        searchUsersNextPage: state.searchUsersNextPage + 1,
        searchUsersTotalPages: action.payload.data.total_pages,
        searchUsersIsLoading: false,
      };
    case GET_SEARCH_USERS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchUsersIsLoading: false,
      };
    case REFRESH_SEARCH_USERS:
      return {
        ...state,
        searchUsersIsLoading: true,
      };
    case REFRESH_SEARCH_USERS_SUCCESS:
      return {
        ...state,
        searchUsers: action.payload.data.results,
        searchUsersNextPage: state.searchUsersNextPage + 1,
        searchUsersTotalPages: action.payload.data.total_pages,
        searchUsersIsLoading: false,
      };
    case REFRESH_SEARCH_USERS_FAIL:
      return {
        ...state,
        searchUsersIsLoading: false,
      };
    case RESET_SEARCH_USERS:
      return { ...state, ...INITIAL_SEARCH_USERS_STATE };
    case GET_SEARCH_TAGS_NEXT_PAGE:
      return {
        ...state,
        searchTagsIsLoading: true,
      };
    case GET_SEARCH_TAGS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchTags: state.searchTags.concat(action.payload.data.results),
        searchTagsNextPage: state.searchTagsNextPage + 1,
        searchTagsTotalPages: action.payload.data.total_pages,
        searchTagsIsLoading: false,
      };
    case GET_SEARCH_TAGS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchTagsIsLoading: false,
      };
    case REFRESH_SEARCH_TAGS:
      return {
        ...state,
        searchTagsIsLoading: true,
      };
    case REFRESH_SEARCH_TAGS_SUCCESS:
      return {
        ...state,
        searchTags: action.payload.data.results,
        searchTagsNextPage: 2,
        searchTagsTotalPages: action.payload.data.total_pages,
        searchTagsIsLoading: false,
      };
    case REFRESH_SEARCH_TAGS_FAIL:
      return {
        ...state,
        searchTagsIsLoading: false,
      };
    case RESET_SEARCH_TAGS:
      return { ...state, ...INITIAL_SEARCH_TAGS_STATE };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectSearch = state => state.search;

export const selectSearchUsers = state => selectSearch(state).searchUsers;
export const selectSearchUsersNextPage = state => selectSearch(state).searchUsersNextPage;
export const selectSearchUsersTotalPages = state => selectSearch(state).searchUsersTotalPages;
export const selectSearchUsersIsLoading = state => selectSearch(state).searchUsersIsLoading;

export const selectSearchTags = state => selectSearch(state).searchTags;
export const selectSearchTagsNextPage = state => selectSearch(state).searchTagsNextPage;
export const selectSearchTagsTotalPages = state => selectSearch(state).searchTagsTotalPages;
export const selectSearchTagsIsLoading = state => selectSearch(state).searchTagsIsLoading;
