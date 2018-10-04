import produce from 'immer';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { UsersActions } from '../actions';
import { FollowStatus } from '../config';
import { State, UserInfo } from '../types';

export interface UsersState {
  me: {
    userInfo: UserInfo,
    isFirstFetch: boolean,
    accessToken: string,
    refreshToken: string,
    lastRefreshTime: number,
  };

  [username: string]: {
    userInfo: UserInfo,
    isFirstFetch: boolean,
  };
}

const INITIAL_USER_INFO_STATE = {
  username: '',
  fullname: '',
  bio: '',
  following: 0,
  followers: 0,
  profile_picture: '',
  following_status: FollowStatus.NOT_FOLLOWED,
  is_private: false,
};

const INITIAL_SELF_USER_INFO_STATE = {
  ...INITIAL_USER_INFO_STATE,
  email: '',
};

const INITIAL_SELF_USER_STATE = {
  userInfo: INITIAL_SELF_USER_INFO_STATE,
  isFirstFetch: true,
  accessToken: '',
  refreshToken: '',
  lastRefreshTime: 0,
};

const INITIAL_OTHER_USER_STATE = {
  userInfo: INITIAL_USER_INFO_STATE,
  isFirstFetch: true,
};

const INITIAL_STATE = {
  me: INITIAL_SELF_USER_STATE,
};

const users = produce<UsersState>((draft: UsersState, action: AnyAction) => {
  const {
    UPDATE_ACCESS_TOKEN_SUCCESS,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO,
    FOLLOW_REQUEST,
    UN_FOLLOW_REQUEST,
    DELETE_FOLLOW_REQUEST,
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS,
  } = UsersActions;
  switch (action.type) {
    case UPDATE_USER_INFO: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      const newPart = username ? INITIAL_OTHER_USER_STATE : INITIAL_SELF_USER_STATE;
      draft[userField] = {
        ...newPart,
        ...draft[userField],
      };
      return;
    }
    case UPDATE_USER_INFO_SUCCESS: {
      const userField = createUserBadge(action.meta.previousAction.payload.username);
      draft[userField] = {
        ...draft[userField],
        userInfo: action.payload.data,
        isFirstFetch: false,
      };
      return;
    }
    case UPDATE_ACCESS_TOKEN_SUCCESS: {
      draft.me.accessToken = action.payload.data.access;
      draft.me.lastRefreshTime = Date.now();
      return;
    }
    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS: {
      draft.me.accessToken = action.payload.data.access;
      draft.me.refreshToken = action.payload.data.refresh;
      draft.me.lastRefreshTime = Date.now();
      return;
    }
    case FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      draft[userField].userInfo.followers =
        draft[userField].userInfo.followers + (draft[userField].userInfo.is_private ? 0 : 1);
      draft[userField].userInfo.following_status =
        draft[userField].userInfo.is_private ? FollowStatus.REQUESTED : FollowStatus.FOLLOWED;
      return;
    }
    case UN_FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      draft[userField].userInfo.followers = draft[userField].userInfo.followers - 1;
      draft[userField].userInfo.following_status = FollowStatus.NOT_FOLLOWED;
      return;
    }
    case DELETE_FOLLOW_REQUEST: {
      const { username } = action.payload;
      const userField = createUserBadge(username);
      draft[userField].userInfo.following_status = FollowStatus.NOT_FOLLOWED;
      return;
    }
  }
}, INITIAL_STATE);

export const selectUsers = (state: State) => state.users;

const selectSelf = (state: State) => selectUsers(state).me;

const createUserBadge = (username: string) => username || 'me';

const checkUserProperty = (state: State, username = 'me') => _.has(selectUsers(state), username);
const getUserProperty = (state: State, username = 'me') => {
  if (checkUserProperty(state, username)) {
    return selectUsers(state)[username];
  }
  return INITIAL_OTHER_USER_STATE;
};

export const selectIsFirstFetch = (state: State, username = 'me') =>
  getUserProperty(state, username).isFirstFetch;

export const selectUsername = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.username;

export const selectBio = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.bio;

export const selectFullName = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.fullname;

export const selectNumOfFollowers = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.followers;

export const selectNumOfFollowings = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.following;

export const selectProfilePicture = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.profile_picture;

export const selectProfileIsPrivate = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.is_private;

export const selectProfileFollowStatus = (state: State, username = 'me') =>
  getUserProperty(state, username).userInfo.following_status;

export const selectSelfEmail = (state: State) => selectSelf(state).userInfo.email;

export const selectAccessToken = (state: State) => selectSelf(state).accessToken;
export const selectRefreshToken = (state: State) => selectSelf(state).refreshToken;
export const selectLastRefreshTime = (state: State) => selectSelf(state).lastRefreshTime;

export default users;
