import { UsersActions } from '../../actions';
import { SearchContactActions } from './actions';

const INITIAL_SEARCH_FOLLOWINGS_STATE = {
  searchFollowings: [],
  searchFollowingsNextPage: 1,
  searchFollowingsTotalPages: 1,
  searchFollowingsIsLoading: false,
  // searchFollowingsIsRefreshing: true,
};

const INITIAL_SEARCH_FOLLOWERS_STATE = {
  searchFollowers: [],
  searchFollowersNextPage: 1,
  searchFollowersTotalPages: 1,
  searchFollowersIsLoading: false,
  // searchFollowersIsRefreshing: true,
};

const INITIAL_STATE = {
  ...INITIAL_SEARCH_FOLLOWINGS_STATE,
  ...INITIAL_SEARCH_FOLLOWERS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_SEARCH_FOLLOWINGS_NEXT_PAGE,
    GET_SEARCH_FOLLOWINGS_NEXT_PAGE_FAIL,
    GET_SEARCH_FOLLOWINGS_NEXT_PAGE_SUCCESS,
    RESET_SEARCH_FOLLOWINGS,
    REFRESH_SEARCH_FOLLOWINGS,
    GET_SEARCH_FOLLOWERS_NEXT_PAGE,
    GET_SEARCH_FOLLOWERS_NEXT_PAGE_FAIL,
    GET_SEARCH_FOLLOWERS_NEXT_PAGE_SUCCESS,
    RESET_SEARCH_FOLLOWERS,
    REFRESH_SEARCH_FOLLOWERS,
    REFRESH_SEARCH_FOLLOWINGS_SUCCESS,
    REFRESH_SEARCH_FOLLOWINGS_FAIL,
    REFRESH_SEARCH_FOLLOWERS_SUCCESS,
    REFRESH_SEARCH_FOLLOWERS_FAIL,
    START_NEW_SEARCH,
  } = SearchContactActions;
  switch (action.type) {
    case START_NEW_SEARCH:
      return {
        ...state,
        searchFollowersNextPage: 1,
        searchFollowingsNextPage: 1,
      };
    case GET_SEARCH_FOLLOWINGS_NEXT_PAGE:
      return {
        ...state,
        searchFollowingsIsLoading: true,
      };
    case GET_SEARCH_FOLLOWINGS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchFollowings: state.searchFollowings.concat(action.payload.data.results),
        searchFollowingsNextPage: state.searchFollowingsNextPage + 1,
        searchFollowingsTotalPages: action.payload.data.total_pages,
        searchFollowingsIsLoading: false,
      };
    case GET_SEARCH_FOLLOWINGS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchFollowingsIsLoading: false,
      };
    case REFRESH_SEARCH_FOLLOWINGS:
      return {
        ...state,
        searchFollowingsIsLoading: true,
      };
    case REFRESH_SEARCH_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        searchFollowings: action.payload.data.results,
        searchFollowingsNextPage: state.searchFollowingsNextPage + 1,
        searchFollowingsTotalPages: action.payload.data.total_pages,
        searchUFollowingsIsLoading: false,
      };
    case REFRESH_SEARCH_FOLLOWINGS_FAIL:
      return {
        ...state,
        searchFollowingsIsLoading: false,
      };
    case RESET_SEARCH_FOLLOWINGS:
      return { ...state, ...INITIAL_SEARCH_FOLLOWINGS_STATE };
    case GET_SEARCH_FOLLOWERS_NEXT_PAGE:
      return {
        ...state,
        searchFollowersIsLoading: true,
      };
    case GET_SEARCH_FOLLOWERS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchFollowers: state.searchFollowers.concat(action.payload.data.results),
        searchFollowersNextPage: state.searchFollowersNextPage + 1,
        searchFollowersTotalPages: action.payload.data.total_pages,
        searchFollowersIsLoading: false,
      };
    case GET_SEARCH_FOLLOWERS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchFollowersIsLoading: false,
      };
    case REFRESH_SEARCH_FOLLOWERS:
      return {
        ...state,
        searchFollowersIsLoading: true,
      };
    case REFRESH_SEARCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        searchFollowers: action.payload.data.results,
        searchFollowersNextPage: state.searchFollowersNextPage + 1,
        searchFollowersTotalPages: action.payload.data.total_pages,
        searchFollowersIsLoading: false,
      };
    case REFRESH_SEARCH_FOLLOWERS_FAIL:
      return {
        ...state,
        searchFollowersIsLoading: false,
      };
    case RESET_SEARCH_FOLLOWERS:
      return { ...state, ...INITIAL_SEARCH_FOLLOWERS_STATE };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectSearchFollowings = state => state.followList.searchFollowings;
export const selectSearchFollowingsNextPage = state => state.followList.searchFollowingsNextPage;
export const selectSearchFollowingsTotalPages = state => state.followList.searchFollowingsTotalPages;
export const selectSearchFollowingsIsLoading = state => state.followList.searchFollowingsIsLoading;
export const selectSearchFollowingsIsRefreshing = state => state.followList.searchFollowingsIsRefreshing;

export const selectSearchFollowers = state => state.followList.searchFollowers;
export const selectSearchFollowersNextPage = state => state.followList.searchFollowersNextPage;
export const selectSearchFollowersTotalPages = state => state.followList.searchFollowersTotalPages;
export const selectSearchFollowersIsLoading = state => state.followList.searchFollowersIsLoading;
export const selectSearchFollowersIsRefreshing = state => state.followList.searchFollowersIsRefreshing;