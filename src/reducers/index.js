import { combineReducers } from 'redux';
import pagination from './pagination.ts';
import posts from './posts.ts';
import users from './users.ts';
import { UsersActions } from '../actions';

const appReducer = combineReducers({
  users,
  pagination,
  posts,
});

export default (state, action) => {
  if (action.type === UsersActions.SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
