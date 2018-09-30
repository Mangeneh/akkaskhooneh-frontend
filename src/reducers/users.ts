import produce from 'immer';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { UsersActions } from '../actions';
import { FollowStatus } from '../config';
import { IUser } from '../types/api';
import { IState } from '../types/state';

export interface IUsersState {
  me: {
    userInfo: IUser,
    isFirstFetch: boolean,
    accessToken: string,
    refreshToken: string,
    lastRefreshTime: number,
  };
  [username: string]: {
    userInfo: IUser,
    isFirstFetch: boolean,
  };
}

const INITIAL_SELF_USER_STATE = {
  userInfo: {},
  isFirstFetch: true,
  accessToken: '',
  refreshToken: '',
  lastRefreshTime: 0,
};

const INITIAL_OTHER_USER_STATE = {
  userInfo: {},
  isFirstFetch: true,
};

const INITIAL_STATE = {
  me: INITIAL_SELF_USER_STATE,
};

const users = produce<IUsersState>((draft: IUsersState, action: AnyAction) => {
  const {
    UPDATE_ACCESS_TOKEN_SUCCESS,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO,
    FOLLOW_REQUEST,
    UN_FOLLOW_REQUEST,
    DELETE_FOLLOW_REQUEST,
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS
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

export const selectUsers = (state: IState) => state.users;

const selectSelf = (state: IState) => selectUsers(state).me;

const createUserBadge = (username: string) => username || 'me';

const checkUserProperty = (state: IState, username) => _.has(selectUsers(state), createUserBadge(username));
const getUserProperty = (state: IState, username) => {
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

export default users;
