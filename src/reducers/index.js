import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditPageReducer from './ProfileEditPageReducer';

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditPageReducer,
});