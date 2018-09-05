import {combineReducers} from 'redux';
import LoginPageReducer from '../pages/login/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import UserInfoReducer from './UserInfoReducer';
import SignUpPageReducer from '../pages/signUp/reducer';
import ChangePassPageReducer from '../pages/changePass/reducer';
import AddPostInfoReducer from '../pages/addPostInfo/reducer';
import PostsReducer from './PostsReducer';
import BoardsReducer from './BoardsReducer';
import HomeReducer from '../pages/home/reducer';
import BoardsPageReducer from '../pages/boardsPage/reducer';

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
    boardsPage: BoardsPageReducer
});