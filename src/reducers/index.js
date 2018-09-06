import { combineReducers } from 'redux';
import AddPostInfoReducer from '../pages/addPostInfo/reducer';
import BoardsPageReducer from '../pages/boardsPage/reducer';
import ChangePassPageReducer from '../pages/changePass/reducer';
import HomeReducer from '../pages/home/reducer';
import LoginPageReducer from '../pages/login/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SignUpPageReducer from '../pages/signUp/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import BoardsReducer from './BoardsReducer';
import PostsReducer from './PostsReducer';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
  loginPage: LoginPageReducer,
  userInfo: UserInfoReducer,
  profileEditPage: ProfileEditPageReducer,
  signUpPage: SignUpPageReducer,
  signUpCompletePage: SignUpCompletePageReducer,
  changePassPage: ChangePassPageReducer,
  addPostInfoPage: AddPostInfoReducer,
  posts: PostsReducer,
  boards: BoardsReducer,
  homePage: HomeReducer,
  boardsPage: BoardsPageReducer,
});
