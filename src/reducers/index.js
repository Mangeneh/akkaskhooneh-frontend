import { combineReducers } from 'redux';
import AddPostInfoReducer from '../pages/addPostInfo/reducer';
import ChangePassPageReducer from '../pages/changePass/reducer';
import ForgotPasswordReducer from '../pages/forgotPassword/reducer';
import GetNewPasswordReducer from '../pages/getNewPassword/reducer';
import LoginPageReducer from '../pages/login/reducer';
import NotificationReducer from '../pages/notification/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SearchPageReducer from '../pages/search/reducer';
import SearchUserOrTagReducer from '../pages/searchUserOrTag/reducer';
import SignUpPageReducer from '../pages/signUp/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import SendTokenReducer from '../pages/tokenPage/reducer';
import pagination from './pagination.ts';
import posts from './posts.ts';
import users from './users.ts';

const appReducer = combineReducers({
  loginPage: LoginPageReducer,
  users,
  posts,
  pagination,
  signUpPage: SignUpPageReducer,
  signUpCompletePage: SignUpCompletePageReducer,
  profileEditPage: ProfileEditPageReducer,
  changePassPage: ChangePassPageReducer,
  addPostInfoPage: AddPostInfoReducer,
  searchPage: SearchPageReducer,
  search: SearchUserOrTagReducer,
  notification: NotificationReducer,
  forgotPass: ForgotPasswordReducer,
  getNewPass: GetNewPasswordReducer,
  sendToken: SendTokenReducer,
});

export default(state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
