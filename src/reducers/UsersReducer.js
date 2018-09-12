import _ from 'lodash';
import GlobalActions from '../actions';
import { UsersActions } from '../actions/UsersActions';

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
  self: INITIAL_SELF_USER_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    UPDATE_ACCESS_TOKEN_SUCCESS, UPDATE_USER_INFO_SUCCESS, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SIGN_OUT,
    UPDATE_USER_INFO,
  } = UsersActions;
  console.log(state);
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
        self: {
          ...state.self,
          accessToken: action.payload.data.access,
          lastRefreshTime: Date.now(),
        },
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        self: {
          ...state.self,
          accessToken: action.payload,
          lastRefreshTime: Date.now(),
        },
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        self: {
          ...state.self,
          refreshToken: action.payload,
        },
      };
    case SIGN_OUT:
      return INITIAL_STATE;
    case GlobalActions.RESET_EVERYTHING:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const createUserBadge = username => username || 'self';

const checkUserProperty = (state, username) => _.has(state.users, createUserBadge(username));
const getUserProperty = (state, username) => {
  if (checkUserProperty(state, username)) {
    return state.users[createUserBadge(username)];
  }
  return INITIAL_OTHER_USER_STATE;
};
export const selectUsername = (state, username) => getUserProperty(state, username).userInfo.username;
export const selectBio = (state, username) => getUserProperty(state, username).userInfo.bio;
export const selectFullName = (state, username) => getUserProperty(state, username).userInfo.fullname;
export const selectNumOfFollowers = (state, username) => getUserProperty(state, username).userInfo.followers;
export const selectNumOfFollowings = (state, username) => getUserProperty(state, username).userInfo.following;
export const selectProfilePicture = (state, username) => getUserProperty(state, username).userInfo.profile_picture;

export const selectAccessToken = state => state.users.self.accessToken;
export const selectRefreshToken = state => state.users.self.refreshToken;
export const selectLastRefreshTime = state => state.users.self.lastRefreshTime;
