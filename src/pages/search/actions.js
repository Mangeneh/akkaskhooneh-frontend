import { RequestMethods, Server } from '../../config';

export const SearchedPostsActions = {
  GET_SEARCH_TOP_TAGS_NEXT_PAGE: 'GET_SEARCH_TOP_TAGS_NEXT_PAGE',
  GET_SEARCH_TOP_TAGS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_TOP_TAGS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_TOP_TAGS_NEXT_PAGE_FAIL: 'GET_SEARCH_TOP_TAGS_NEXT_PAGE_FAIL',
  REFRESH_SEARCH_TOP_TAGS: 'REFRESH_SEARCH_TOP_TAGS',
  REFRESH_SEARCH_TOP_TAGS_SUCCESS: 'REFRESH_SEARCH_TOP_TAGS_SUCCESS',
  REFRESH_SEARCH_TOP_TAGS_FAIL: 'REFRESH_SEARCH_TOP_TAGS_FAIL',
};

export const refreshSearchTopTags = () => ({
  type: SearchedPostsActions.REFRESH_SEARCH_TOP_TAGS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_TOP_TAGS}1`,
    },
  },
});

export const getSearchTopTagsNextPage = photosNext => ({
  type: SearchedPostsActions.GET_SEARCH_TOP_TAGS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_TOP_TAGS}${photosNext}`,
    },
  },
});
