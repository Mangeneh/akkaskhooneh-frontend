import { SearchedPostsActions } from './actions';

const INITIAL_SEARCH_TOP_TAGS_STATE = {
  searchTopTags: [],
  searchTopTagsNextPage: 1,
  searchTopTagsTotalPages: 1,
  searchTopTagsIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_SEARCH_TOP_TAGS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_SEARCH_TOP_TAGS_NEXT_PAGE,
    GET_SEARCH_TOP_TAGS_NEXT_PAGE_SUCCESS,
    GET_SEARCH_TOP_TAGS_NEXT_PAGE_FAIL,
    REFRESH_SEARCH_TOP_TAGS,
    REFRESH_SEARCH_TOP_TAGS_SUCCESS,
  } = SearchedPostsActions;
  switch (action.type) {
    case REFRESH_SEARCH_TOP_TAGS:
      return {
        ...state,
        searchTopTagsIsLoading: true,
      };
    case REFRESH_SEARCH_TOP_TAGS_SUCCESS:
      return {
        ...state,
        searchTopTags: action.payload.data.results,
        searchTopTagsNextPage: 2,
        searchTopTagsTotalPages: action.payload.data.total_pages,
        searchTopTagsIsLoading: false,
      };
    case GET_SEARCH_TOP_TAGS_NEXT_PAGE:
      return {
        ...state,
        searchTopTagsIsLoading: true,
      };
    case GET_SEARCH_TOP_TAGS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchTopTags: state.searchTopTags.concat(action.payload.data.results),
        searchTopTagsNextPage: state.searchTopTagsNextPage + 1,
        searchTopTagsTotalPages: action.payload.data.total_pages,
        searchTopTagsIsLoading: false,
      };
    default:
      return state;
  }
};

export const selectSearchTopTags = state => state.searchPage.searchTopTags;
export const selectSearchTopTagsNextPage = state => state.searchPage.searchTopTagsNextPage;
export const selectSearchTopTagsTotalPages = state => state.searchPage.searchTopTagsTotalPages;
export const selectSearchTopTagsIsLoading = state => state.searchPage.searchTopTagsIsLoading;
