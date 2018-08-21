import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditPageReducer from './ProfileEditPageReducer';
import SignUpCompletePageReducer from "./SignUpCompletePageReducer"

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditPageReducer,
    signUpCompletePage: SignUpCompletePageReducer,
});