import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditPageReducer from './ProfileEditPageReducer';
import SignUpCompletePageReducer from "./SignUpCompletePageReducer";
import UserInfoReducer from './UserInfoReducer';
export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditPageReducer,
    signUpCompletePage: SignUpCompletePageReducer,
    userInfo : UserInfoReducer
});