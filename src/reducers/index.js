import {combineReducers} from 'redux';
import LoginReducer from "./LoginReducer";
import EmailReducer from "./EmailReducer";

export default combineReducers({
    mode: LoginReducer,
    emailVerification: EmailReducer
});