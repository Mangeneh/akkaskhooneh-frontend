import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";
import ProfileEditReducer from './ProfileEditReducer';

export default combineReducers({
    loginPage: LoginPageReducer,
    profileEditPage: ProfileEditReducer,
});