import {combineReducers} from 'redux';
import LoginPageReducer from '../pages/login/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import UserInfoReducer from './UserInfoReducer';
import SignUpPageReducer from '../pages/signUp/reducer'

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditPageReducer,
    signUpCompletePage: SignUpCompletePageReducer,
    userInfo: UserInfoReducer,
    signUpPage: SignUpPageReducer,
});