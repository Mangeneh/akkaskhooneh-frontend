import { combineReducers } from 'redux';
import AddPostInfoReducer from '../pages/addPostInfo/reducer';
import ChangePassPageReducer from '../pages/changePass/reducer';
import FollowListReducer from '../pages/contactListPage/reducer';
import ForgotPasswordReducer from '../pages/forgotPassword/reducer';
import LoginPageReducer from '../pages/login/reducer';
import NotificationReducer from '../pages/notification/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SearchPageReducer from '../pages/search/reducer';
import SearchUserOrTagReducer from '../pages/searchUserOrTag/reducer';
import SignUpPageReducer from '../pages/signUp/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import BoardsReducer from './BoardsReducer';
import PostsReducer from './PostsReducer';
import UsersReducer from './UsersReducer';

export default combineReducers({
  loginPage: LoginPageReducer,
  users: UsersReducer,
  posts: PostsReducer,
  boards: BoardsReducer,
  signUpPage: SignUpPageReducer,
  signUpCompletePage: SignUpCompletePageReducer,
  profileEditPage: ProfileEditPageReducer,
  changePassPage: ChangePassPageReducer,
  addPostInfoPage: AddPostInfoReducer,
  searchPage: SearchPageReducer,
  search: SearchUserOrTagReducer,
  followList: FollowListReducer,
  notification: NotificationReducer,
  forgotPass: ForgotPasswordReducer,
});

export const selectLoginPage = state => state.loginPage;
export const selectSignUpPage = state => state.signUpPage;
export const selectSignUpCompletePage = state => state.signUpCompletePage;
export const selectPosts = state => state.posts;
export const selectUsers = state => state.users;
export const selectBoards = state => state.boards;
export const selectProfileEditPage = state => state.profileEditPage;
export const selectChangePassPage = state => state.changePassPage;
export const selectAddPostInfoPage = state => state.addPostInfoPage;
export const selectSearchPage = state => state.searchPage;
export const selectSearch = state => state.search;
export const selectNotificationPage = state => state.notification;
export const selectForgotPass = state => state.forgotPass;
