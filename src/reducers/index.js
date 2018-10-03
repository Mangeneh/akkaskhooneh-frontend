import { combineReducers } from 'redux';
import NotificationReducer from '../pages/notification/reducer';
import SearchPageReducer from '../pages/search/reducer';
import SearchUserOrTagReducer from '../pages/searchUserOrTag/reducer';
import pagination from './pagination.ts';
import posts from './posts.ts';
import users from './users.ts';

const appReducer = combineReducers({
  users,
  posts,
  pagination,
  searchPage: SearchPageReducer,
  search: SearchUserOrTagReducer,
  notification: NotificationReducer,
});

export default(state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
