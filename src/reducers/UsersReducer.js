import _ from 'lodash';
import { UsersActions } from '../actions/UsersActions';
import { selectUsers } from './index';

const INITIAL_FOLLOWERS_FOLLOWINGS_STATE = {
  followers: [],
  followersNextPage: 1,
  followersTotalPages: 1,
  followersIsFirstFetch: true,
  followersIsRefreshing: false,
  followersIsLoading: false,
  followings: [],
  followingsNextPage: 1,
  followingsTotalPages: 1,
  followingsIsFirstFetch: true,
  followingsIsRefreshing: false,
  followingsIsLoading: false,
};

const INITIAL_SELF_USER_STATE = {
  userInfo: {},
  accessToken: '',
  refreshToken: '',
  lastRefreshTime: 0,
  social: INITIAL_FOLLOWERS_FOLLOWINGS_STATE,
};

const INITIAL_OTHER_USER_STATE = {
  userInfo: {},
  social: INITIAL_FOLLOWERS_FOLLOWINGS_STATE,
};

const INITIAL_STATE = {
  me: INITIAL_SELF_USER_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    UPDATE_ACCESS_TOKEN_SUCCESS, UPDATE_USER_INFO_SUCCESS, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SIGN_OUT,
    UPDATE_USER_INFO, GET_FOLLOWERS_NEXT_PAGE, GET_FOLLOWERS_NEXT_PAGE_SUCCESS, GET_FOLLOWINGS_NEXT_PAGE, GET_FOLLOWINGS_NEXT_PAGE_SUCCESS,
    GET_FOLLOWERS_NEXT_PAGE_FAIL, GET_FOLLOWINGS_NEXT_PAGE_FAIL, REFRESH_FOLLOWERS_FAIL, REFRESH_FOLLOWINGS_FAIL,
    REFRESH_FOLLOWERS, REFRESH_FOLLOWERS_SUCCESS, REFRESH_FOLLOWINGS, REFRESH_FOLLOWINGS_SUCCESS,
  } = UsersActions;
  console.log(state);
  console.log(action);
  switch (action.type) {
    case UPDATE_USER_INFO: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      const newPart = username ? INITIAL_OTHER_USER_STATE : INITIAL_SELF_USER_STATE;
      return {
        ...state,
        [userField]: {
          ...newPart,
          ...state[userField],
        },
      };
    }
    case UPDATE_USER_INFO_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userInfo: action.payload.data,
        },
      };
    }
    case UPDATE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          accessToken: action.payload.data.access,
          lastRefreshTime: Date.now(),
        },
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        me: {
          ...state.me,
          accessToken: action.payload,
          lastRefreshTime: Date.now(),
        },
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        me: {
          ...state.me,
          refreshToken: action.payload,
        },
      };
    //
    case GET_FOLLOWINGS_NEXT_PAGE: {
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followingsIsLoading: true,
          },
        },
      };
    }
    case GET_FOLLOWINGS_NEXT_PAGE_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followings: state[userField].social.followings.concat(action.payload.data.results),
            followingsNextPage: state[userField].social.followingsNextPage + 1,
            followingsTotalPages: action.payload.data.total_pages,
            followingsIsLoading: false,
          },
        },
      };
    }
    case GET_FOLLOWINGS_NEXT_PAGE_FAIL: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followingsIsLoading: false,
          },
        },
      };
    }
    case REFRESH_FOLLOWINGS: {
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followingsIsRefreshing: true,
          },
        },
      };
    }
    case REFRESH_FOLLOWINGS_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followings: action.payload.data.results,
            followingsNextPage: 2,
            followingsTotalPages: action.payload.data.total_pages,
            followingsIsFirstFetch: false,
            followingsIsRefreshing: false,
          },
        },
      };
    }
    case REFRESH_FOLLOWINGS_FAIL: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followingsIsRefreshing: false,
          },
        },
      };
    }
    case GET_FOLLOWERS_NEXT_PAGE: {
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followersIsLoading: true,
          },
        },
      };
    }
    case GET_FOLLOWERS_NEXT_PAGE_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followers: state[userField].social.followers.concat(action.payload.data.results),
            followersNextPage: state[userField].social.followersNextPage + 1,
            followersTotalPages: action.payload.data.total_pages,
            followersIsLoading: false,
          },
        },
      };
    }
    case GET_FOLLOWERS_NEXT_PAGE_FAIL: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followersIsLoading: false,
          },
        },
      };
    }
    case REFRESH_FOLLOWERS: {
      const userField = createUserBadge(action.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followersIsRefreshing: true,
          },
        },
      };
    }
    case REFRESH_FOLLOWERS_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followers: action.payload.data.results,
            followersNextPage: 2,
            followersTotalPages: action.payload.data.total_pages,
            followersIsFirstFetch: false,
            followersIsRefreshing: false,
          },
        },
      };
    }
    case REFRESH_FOLLOWERS_FAIL: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          social: {
            ...state[userField].social,
            followersIsRefreshing: false,
          },
        },
      };
    }
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const selectSelf = state => selectUsers(state).me;

const createUserBadge = username => username || 'me';

const checkUserProperty = (state, username) => _.has(selectUsers(state), createUserBadge(username));
const getUserProperty = (state, username) => {
  if (checkUserProperty(state, username)) {
    return selectUsers(state)[createUserBadge(username, state)];
  }
  return INITIAL_OTHER_USER_STATE;
};
export const selectUsername = (state, username) => getUserProperty(state, username).userInfo.username;
export const selectBio = (state, username) => getUserProperty(state, username).userInfo.bio;
export const selectFullName = (state, username) => getUserProperty(state, username).userInfo.fullname;
export const selectNumOfFollowers = (state, username) => getUserProperty(state, username).userInfo.followers;
export const selectNumOfFollowings = (state, username) => getUserProperty(state, username).userInfo.following;
export const selectProfilePicture = (state, username) => getUserProperty(state, username).userInfo.profile_picture;

export const selectSelfEmail = state => selectSelf(state).userInfo.email;

export const selectAccessToken = state => selectSelf(state).accessToken;
export const selectRefreshToken = state => selectSelf(state).refreshToken;
export const selectLastRefreshTime = state => selectSelf(state).lastRefreshTime;

export const selectFollowings = (state, username) => getUserProperty(state, username).social.followings;
export const selectFollowingsNextPage = (state, username) => getUserProperty(state, username).social.followingsNextPage;
export const selectFollowingsTotalPages = (state, username) => getUserProperty(state, username).social.followingsTotalPages;
export const selectFollowingsIsFirstFetch = (state, username) => getUserProperty(state, username).social.followingsIsFirstFetch;
export const selectFollowingsIsRefreshing = (state, username) => getUserProperty(state, username).social.followingsIsRefreshing;
export const selectFollowingsIsLoading = (state, username) => getUserProperty(state, username).social.followingsIsLoading;

export const selectFollowers = (state, username) => getUserProperty(state, username).social.followers;
export const selectFollowersNextPage = (state, username) => getUserProperty(state, username).social.followersNextPage;
export const selectFollowersTotalPages = (state, username) => getUserProperty(state, username).social.followersTotalPages;
export const selectFollowersIsFirstFetch = (state, username) => getUserProperty(state, username).social.followersIsFirstFetch;
export const selectFollowersIsRefreshing = (state, username) => getUserProperty(state, username).social.followersIsRefreshing;
export const selectFollowersIsLoading = (state, username) => getUserProperty(state, username).social.followersIsLoading;
