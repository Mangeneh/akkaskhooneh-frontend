import { combineReducers } from 'redux';
import AddPostInfoReducer from '../pages/addPostInfo/reducer';
import ChangePassPageReducer from '../pages/changePass/reducer';
import ForgotPasswordReducer from '../pages/forgotPassword/reducer';
import LoginPageReducer from '../pages/login/reducer';
import NotificationReducer from '../pages/notification/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SearchPageReducer from '../pages/search/reducer';
import SearchUserOrTagReducer from '../pages/searchUserOrTag/reducer';
import SignUpPageReducer from '../pages/signUp/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import BoardsReducer from './BoardsReducer';
import UsersReducer from './UsersReducer';
import GetNewPasswordReducer from '../pages/getNewPassword/reducer';
import SendTokenReducer from '../pages/tokenPage/reducer';
import posts from './posts';
import pagination from './pagination';

export default combineReducers({
  loginPage: LoginPageReducer,
  users: UsersReducer,
  posts,
  pagination,
  boards: BoardsReducer,
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
