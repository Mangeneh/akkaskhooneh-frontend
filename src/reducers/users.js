import _ from 'lodash';
import { UsersActions } from '../actions/UsersActions';
import { FollowStatus } from '../config';

const INITIAL_SELF_USER_STATE = {
  userInfo: {},
  userInfoIsFirstFetch: true,
  accessToken: '',
  refreshToken: '',
  lastRefreshTime: 0,
};

const INITIAL_OTHER_USER_STATE = {
  userInfo: {},
  userInfoIsFirstFetch: true,
};

const INITIAL_STATE = {
  me: INITIAL_SELF_USER_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    UPDATE_ACCESS_TOKEN_SUCCESS,
    UPDATE_USER_INFO_SUCCESS,
    SET_ACCESS_TOKEN,
    SET_REFRESH_TOKEN,
    UPDATE_USER_INFO,
    FOLLOW_REQUEST,
    UN_FOLLOW_REQUEST,
    DELETE_FOLLOW_REQUEST,
    SIGN_OUT,
  } = UsersActions;
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
          userInfoIsFirstFetch: false,
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
    case FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userInfo: {
            ...state[userField].userInfo,
            followers: state[userField].userInfo.followers + (state[userField].userInfo.is_private ? 0 : 1),
            following_status: state[userField].userInfo.is_private ? FollowStatus.REQUESTED : FollowStatus.FOLLOWED,
          },
        },
      };
    }
    case UN_FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userInfo: {
            ...state[userField].userInfo,
            followers: state[userField].userInfo.followers - 1,
            following_status: FollowStatus.NOT_FOLLOWED,
          },
        },
      };
    }
    case DELETE_FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      return {
        ...state,
        [userField]: {
          ...state[userField],
          userInfo: {
            ...state[userField].userInfo,
            following_status: FollowStatus.NOT_FOLLOWED,
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

export const selectUsers = state => state.users;

const selectSelf = state => selectUsers(state).me;

const createUserBadge = username => username || 'me';

const checkUserProperty = (state, username) => _.has(selectUsers(state), createUserBadge(username));
const getUserProperty = (state, username) => {
  if (checkUserProperty(state, username)) {
    return selectUsers(state)[createUserBadge(username, state)];
  }
  return INITIAL_OTHER_USER_STATE;
};
export const selectUserInfoIsFirstFetch = (state, username) => getUserProperty(state, username).userInfoIsFirstFetch;
export const selectUsername = (state, username) => getUserProperty(state, username).userInfo.username;
export const selectBio = (state, username) => getUserProperty(state, username).userInfo.bio;
export const selectFullName = (state, username) => getUserProperty(state, username).userInfo.fullname;
export const selectNumOfFollowers = (state, username) => getUserProperty(state, username).userInfo.followers;
export const selectNumOfFollowings = (state, username) => getUserProperty(state, username).userInfo.following;
export const selectProfilePicture = (state, username) => getUserProperty(state, username).userInfo.profile_picture;
export const selectProfileIsPrivate = (state, username) => getUserProperty(state, username).userInfo.is_private;
export const selectProfileFollowStatus = (state, username) => getUserProperty(state, username).userInfo.following_status;

export const selectSelfEmail = state => selectSelf(state).userInfo.email;

export const selectAccessToken = state => selectSelf(state).accessToken;
export const selectRefreshToken = state => selectSelf(state).refreshToken;
export const selectLastRefreshTime = state => selectSelf(state).lastRefreshTime;
