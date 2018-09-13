import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkEmail, checkPassword } from '../../helpers/Validators';
import { selectLoginPage } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  email: 'test@test.com',
  password: 'test1234',
  mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
  const {
    EMAIL_CHANGED,
    LOGIN_RESET,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    PASSWORD_RESET,
    EMAIL_RESET,
  } = Actions;
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
        mode: validate(action.payload, state.password),
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
        mode: validate(state.email, action.payload),
      };
    case LOGIN:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        mode: PageModes.SUCCESS,
      };
    case PASSWORD_RESET:
      return {
        ...state,
        password: '',
        mode: PageModes.DISABLED,
      };
    case EMAIL_RESET:
      return {
        ...state,
        email: '',
        mode: PageModes.DISABLED,
      };
    case LOGIN_RESET:
      return INITIAL_STATE;
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(email, password) {
  if (checkPassword(password) && checkEmail(email)) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}

export const selectEmail = state => selectLoginPage(state).email;
export const selectPassword = state => selectLoginPage(state).password;
export const selectMode = state => selectLoginPage(state).mode;
export const selectError = state => selectMode(state) === PageModes.ERROR;
