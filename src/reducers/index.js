import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditReducer from './ProfileEditReducer';
import SignUpCompletePageReducer from "./SignUpCompletePageReducer"

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditReducer,
    signUpCompletePage: SignUpCompletePageReducer,
});