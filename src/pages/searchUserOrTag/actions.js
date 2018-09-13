import { RequestMethods, Server } from '../../config';

export const SearchUserOrTagActions = {
  GET_SEARCH_USERS_NEXT_PAGE: 'GET_SEARCH_USERS_NEXT_PAGE',
  GET_SEARCH_USERS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_USERS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_USERS_NEXT_PAGE_FAIL: 'GET_SEARCH_USERS_NEXT_PAGE_FAIL',
  REFRESH_SEARCH_USERS: 'REFRESH_SEARCH_USERS',
  REFRESH_SEARCH_USERS_SUCCESS: 'REFRESH_SEARCH_USERS_SUCCESS',
  REFRESH_SEARCH_USERS_FAIL: 'REFRESH_SEARCH_USERS_FAIL',
  GET_SEARCH_TAGS_NEXT_PAGE: 'GET_SEARCH_TAGS_NEXT_PAGE',
  GET_SEARCH_TAGS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_TAGS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_TAGS_NEXT_PAGE_FAIL: 'GET_SEARCH_TAGS_NEXT_PAGE_FAIL',
  REFRESH_SEARCH_TAGS: 'REFRESH_SEARCH_TAGS',
  REFRESH_SEARCH_TAGS_SUCCESS: 'REFRESH_SEARCH_TAGS_SUCCESS',
  REFRESH_SEARCH_TAGS_FAIL: 'REFRESH_SEARCH_TAGS_FAIL',
  START_NEW_SEARCH: 'START_NEW_SEARCH',
};

export const startNewSearch = () => ({
  type: SearchUserOrTagActions.START_NEW_SEARCH,
});

export const refreshSearchUsers = text => ({
  type: SearchUserOrTagActions.REFRESH_SEARCH_USERS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_USERS_RESULTS}?search=${text}&?page=1`,
    },
  },
});

export const getSearchUsers = (text, usersNext) => ({
  type: SearchUserOrTagActions.GET_SEARCH_USERS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_USERS_RESULTS}?search=${text}&?page=${usersNext}`,
    },
  },
});

export const refreshSearchTags = text => ({
  type: SearchUserOrTagActions.REFRESH_SEARCH_TAGS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_TAGS_RESULTS}?search=${text}&?page=1`,
    },
  },
});

export const getSearchTags = (text, tagsNext) => ({
  type: SearchUserOrTagActions.GET_SEARCH_TAGS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_TAGS_RESULTS}?search=${text}&page=${tagsNext}`,
    },
  },
});
