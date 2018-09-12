import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkEmail, checkPassword } from '../../helpers/Validators';
import { Actions } from './actions';

const INITIAL_STATE = {
  email: '',
  password: '',
  repeatedPassword: '',
  mode: PageModes.DISABLED,
};

export default (state = INITIAL_STATE, action) => {
  const {
    EMAIL_CHANGED,
    SIGN_UP_RESET,
    PASSWORD_CHANGED,
    REPEATED_PASSWORD_CHANGED,
    VALIDATE_EMAIL,
    VALIDATE_EMAIL_FAIL,
    VALIDATE_EMAIL_SUCCESS,
    EMAIL_RESET,
  } = Actions;
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
        mode: validate(action.payload, state.password, state.repeatedPassword),
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
        mode: validate(state.email, action.payload, state.repeatedPassword),
      };
    case REPEATED_PASSWORD_CHANGED:
      return {
        ...state,
        repeatedPassword: action.payload,
        mode: validate(state.email, state.password, action.payload),
      };
    case VALIDATE_EMAIL:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case VALIDATE_EMAIL_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case VALIDATE_EMAIL_SUCCESS:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case EMAIL_RESET:
      return {
        ...state,
        email: '',
        mode: PageModes.DISABLED,
      };
    case SIGN_UP_RESET:
      return INITIAL_STATE;
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(email, password, repeatedPassword) {
  if (checkPassword(password) && checkEmail(email) && password === repeatedPassword) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}
