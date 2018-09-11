import { RequestMethods, Server } from '../../config';

export const SearchUserOrTagActions = {
  GET_SEARCH_FOLLOWINGS_NEXT_PAGE: 'GET_SEARCH_FOLLOWINGS_NEXT_PAGE',
  GET_SEARCH_FOLLOWINGS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_FOLLOWINGS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_FOLLOWINGS_NEXT_PAGE_FAIL: 'GET_SEARCH_FOLLOWINGS_NEXT_PAGE_FAIL',
  RESET_SEARCH_FOLLOWINGS: 'RESET_SEARCH_FOLLOWINGS',
  REFRESH_SEARCH_FOLLOWINGS: 'REFRESH_SEARCH_FOLLOWINGS',
  REFRESH_SEARCH_FOLLOWINGS_SUCCESS: 'REFRESH_SEARCH_FOLLOWINGS_SUCCESS',
  REFRESH_SEARCH_FOLLOWINGS_FAIL: 'REFRESH_SEARCH_FOLLOWINGS_FAIL',
  GET_SEARCH_FOLLOWERS_NEXT_PAGE: 'GET_SEARCH_FOLLOWERS_NEXT_PAGE',
  GET_SEARCH_FOLLOWERS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_FOLLOWERS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_FOLLOWERS_NEXT_PAGE_FAIL: 'GET_SEARCH_FOLLOWERS_NEXT_PAGE_FAIL',
  RESET_SEARCH_FOLLOWERS: 'RESET_SEARCH_FOLLOWERS',
  REFRESH_SEARCH_FOLLOWERS: 'REFRESH_SEARCH_FOLLOWERS',
  REFRESH_SEARCH_FOLLOWERS_SUCCESS: 'REFRESH_SEARCH_FOLLOWERS_SUCCESS',
  REFRESH_SEARCH_FOLLOWERS_FAIL: 'REFRESH_SEARCH_FOLLOWERS_FAIL',
  START_NEW_SEARCH: 'START_NEW_SEARCH',
};

export const resetSearchFollowings = () => ({
  type: SearchUserOrTagActions.RESET_SEARCH_FOLLOWINGS,
});

export const startNewSearch = () => ({
  type: SearchUserOrTagActions.START_NEW_SEARCH,
});

export const refreshSearchFollowings = (text, username) => ({
  type: SearchUserOrTagActions.REFRESH_SEARCH_FOLLOWINGS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_FOLLOWINGS}${username}/?search=${text}&page=1`,
    },
  },
});

export const getSearchFollowings = (text, followingsNext, username) => ({
  type: SearchUserOrTagActions.GET_SEARCH_FOLLOWINGS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_FOLLOWINGS}${username}/?search=${text}&page=${followingsNext}`,
    },
  },
});

export const resetSearchFollowers = () => ({
  type: SearchUserOrTagActions.RESET_SEARCH_FOLLOWERS,
});


export const refreshSearchFollowers = (text, username)  => ({
  type: SearchUserOrTagActions.REFRESH_SEARCH_FOLLOWERS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_FOLLOWERS}${username}/?search=${text}&page=1`,
    },
  },
});

export const getSearchFollowers = (text, followersNext, username) => ({
  type: SearchUserOrTagActions.GET_SEARCH_FOLLOWERS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_FOLLOWERS}${username}/?search=${text}&page=${followersNext}`,
    },
  },
});
