import {combineReducers} from 'redux';
import LoginPageReducer from '../pages/login/reducer';
import ProfileEditPageReducer from '../pages/profileEdit/reducer';
import SignUpCompletePageReducer from '../pages/signUpComplete/reducer';
import UserInfoReducer from './UserInfoReducer';
import SignUpPageReducer from '../pages/signUp/reducer'
import ChangePassPageReducer from '../pages/changePass/reducer'

export default combineReducers({
    loginPage: LoginPageReducer,
    userInfo: UserInfoReducer,
    profileEditPage: ProfileEditPageReducer,
    signUpPage: SignUpPageReducer,
    signUpCompletePage: SignUpCompletePageReducer,
    changePassPage: ChangePassPageReducer,
});