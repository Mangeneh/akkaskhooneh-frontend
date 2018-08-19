import {combineReducers} from 'redux';
import LoginReducer from "./LoginReducer";
import EmailReducer from "./EmailReducer";
import NameReducer from "./NameReducer"

export default combineReducers({
    mode: LoginReducer,
    emailVerification: EmailReducer,
    name: NameReducer
});