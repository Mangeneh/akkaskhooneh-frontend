import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditPageReducer from './ProfileEditPageReducer';
import SignUpCompletePageReducer from "./SignUpCompletePageReducer";
import UserInfoReducer from './UserInfoReducer';
import SignUpPageReducer from './SignUpPageReducer'

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditPageReducer,
    signUpCompletePage: SignUpCompletePageReducer,
    userInfo: UserInfoReducer,
    signUpPage: SignUpPageReducer,
});