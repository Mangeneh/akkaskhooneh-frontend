import { generatePaginatorActionCreators, generatePaginatorSelectors } from './reducers/paginator';
import { selectUsername } from './reducers/users';
import { createUserBoardsURL, createUserPhotosURL } from './config/URLCreators';

export const generateSelfPhotosSelectors = (state) => {
  const selfUsername = selectUsername(state);
  return generatePaginatorSelectors(state, 'user_photos_', selfUsername);
};

export const generateSelfBoardsSelectors = (state) => {
  const selfUsername = selectUsername(state);
  return generatePaginatorSelectors(state, 'user_boards_', selfUsername);
};

export const generateSelfPhotosActions = (state) => {
  const selfUsername = selectUsername(state);
  return generatePaginatorActionCreators('user_photos_', selfUsername);
};

export const generateSelfBoardsActions = (state) => {
  const selfUsername = selectUsername(state);
  return generatePaginatorActionCreators('user_boards_', selfUsername);
};

export const refreshSelfPhotosThunk = (dispatch, getState) => dispatch(generateSelfPhotosActions(getState())
  .refresh(createUserPhotosURL(selectUsername(getState()))));
export const loadMoreSelfPhotosThunk = nextPage => (dispatch, getState) => dispatch(generateSelfPhotosActions(getState())
  .refresh(createUserPhotosURL(selectUsername(getState()), nextPage)));

export const refreshSelfBoardsThunk = (dispatch, getState) => dispatch(generateSelfBoardsActions(getState())
  .refresh(createUserBoardsURL(selectUsername(getState()))));
export const loadMoreSelfBoardsThunk = nextPage => (dispatch, getState) => dispatch(generateSelfBoardsActions(getState())
  .refresh(createUserBoardsURL(selectUsername(getState()), nextPage)));
