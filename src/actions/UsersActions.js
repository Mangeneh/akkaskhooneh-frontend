import { RequestMethods, Server } from '../config';

export const UsersActions = {
  UPDATE_ACCESS_TOKEN: 'UPDATE_ACCESS_TOKEN',
  UPDATE_ACCESS_TOKEN_SUCCESS: 'UPDATE_ACCESS_TOKEN_SUCCESS',
  SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_USER_INFO_FAIL: 'UPDATE_USER_INFO_FAIL',
  GET_FOLLOWINGS_NEXT_PAGE: 'GET_FOLLOWINGS_NEXT_PAGE',
  GET_FOLLOWINGS_NEXT_PAGE_SUCCESS: 'GET_FOLLOWINGS_NEXT_PAGE_SUCCESS',
  GET_FOLLOWINGS_NEXT_PAGE_FAIL: 'GET_FOLLOWINGS_NEXT_PAGE_FAIL',
  REFRESH_FOLLOWINGS: 'REFRESH_FOLLOWINGS',
  REFRESH_FOLLOWINGS_SUCCESS: 'REFRESH_FOLLOWINGS_SUCCESS',
  REFRESH_FOLLOWINGS_FAIL: 'REFRESH_FOLLOWINGS_FAIL',
  GET_FOLLOWERS_NEXT_PAGE: 'GET_FOLLOWERS_NEXT_PAGE',
  GET_FOLLOWERS_NEXT_PAGE_SUCCESS: 'GET_FOLLOWERS_NEXT_PAGE_SUCCESS',
  GET_FOLLOWERS_NEXT_PAGE_FAIL: 'GET_FOLLOWERS_NEXT_PAGE_FAIL',
  REFRESH_FOLLOWERS: 'REFRESH_FOLLOWERS',
  REFRESH_FOLLOWERS_SUCCESS: 'REFRESH_FOLLOWERS_SUCCESS',
  REFRESH_FOLLOWERS_FAIL: 'REFRESH_FOLLOWERS_FAIL',
  FOLLOW_REQUEST: 'FOLLOW_REQUEST',
  FOLLOW_REQUEST_SUCCESS: 'FOLLOW_REQUEST_SUCCESS',
  FOLLOW_REQUEST_FAIL: 'FOLLOW_REQUEST_FAIL',
  UN_FOLLOW_REQUEST: 'UN_FOLLOW_REQUEST',
  UN_FOLLOW_REQUEST_SUCCESS: 'UN_FOLLOW_REQUEST_SUCCESS',
  UN_FOLLOW_REQUEST_FAIL: 'UN_FOLLOW_REQUEST_FAIL',
  DELETE_FOLLOW_REQUEST: 'DELETE_FOLLOW_REQUEST',
  DELETE_FOLLOW_REQUEST_SUCCESS: 'DELETE_FOLLOW_REQUEST_SUCCESS',
  DELETE_FOLLOW_REQUEST_FAIL: 'DELETE_FOLLOW_REQUEST_FAIL',
  SIGN_OUT: 'SIGN_OUT',
};

export const reset = () => ({ type: UsersActions.SIGN_OUT });

export const refreshTokenSet = refreshToken => ({
  type: UsersActions.SET_REFRESH_TOKEN,
  payload: refreshToken,
});

export const accessTokenSet = accessToken => ({
  type: UsersActions.SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const accessTokenUpdated = refreshToken => ({
  type: UsersActions.UPDATE_ACCESS_TOKEN,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.UPDATE_ACCESS_TOKEN,
      data: {
        refresh: refreshToken,
      },
    },
  },
});

export const updateUser = (username) => {
  const url = username ? `${Server.UPDATE_USER}${username}/` : Server.UPDATE_USER;
  return {
    type: UsersActions.UPDATE_USER_INFO,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const refreshFollowings = (searchText, username) => {
  const url = username ? `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}${username}/?search=${searchText}&page=1`
    : `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}?search=${searchText}&page=1`;
  return {
    type: UsersActions.REFRESH_FOLLOWINGS,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const getFollowings = (searchText, followingsNext, username) => {
  const url = username ? `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}${username}/?search=${searchText}&page=${followingsNext}`
    : `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}?search=${searchText}&page=${followingsNext}`;
  return {
    type: UsersActions.GET_FOLLOWINGS_NEXT_PAGE,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const refreshFollowers = (searchText, username) => {
  const url = username ? `${Server.GET_SEARCH_FOLLOWERS_RESULTS}${username}/?search=${searchText}&page=1`
    : `${Server.GET_SEARCH_FOLLOWERS_RESULTS}?search=${searchText}&page=1`;
  return {
    type: UsersActions.REFRESH_FOLLOWERS,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const getFollowers = (searchText, followersNext, username) => {
  const url = username ? `${Server.GET_SEARCH_FOLLOWERS_RESULTS}${username}/?search=${searchText}&page=${followersNext}`
    : `${Server.GET_SEARCH_FOLLOWERS_RESULTS}?search=${searchText}&page=${followersNext}`;
  return {
    type: UsersActions.GET_FOLLOWERS_NEXT_PAGE,
    payload: {
      request: {
        method: RequestMethods.GET,
        url,
      },
      username,
    },
  };
};

export const startNewSearch = () => ({
  type: UsersActions.START_NEW_SEARCH,
});

export const followRequest = username => ({
  type: UsersActions.FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});

export const unFollowRequest = username => ({
  type: UsersActions.UN_FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.UN_FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});

export const deleteFollowRequest = username => ({
  type: UsersActions.DELETE_FOLLOW_REQUEST,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.DELETE_FOLLOW_REQUEST,
      data: {
        username,
      },
    },
    username,
  },
});
