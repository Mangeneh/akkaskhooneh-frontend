import { combineReducers } from 'redux';
import pagination from './pagination.ts';
import posts from './posts.ts';
import users from './users.ts';

const appReducer = combineReducers({
  users,
  pagination,
  posts,
});

export default (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
