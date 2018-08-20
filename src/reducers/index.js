import {combineReducers} from 'redux';
import LoginPageReducer from "./LoginPageReducer";

export default combineReducers({
    loginPage: LoginPageReducer,
});