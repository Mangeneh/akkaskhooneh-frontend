import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkPassword } from '../../helpers/Validators';
import { selectChangePassPage } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.DISABLED,
  previousPassword: '',
  newPassword: '',
  repeatedPassword: '',
};

export default (state = INITIAL_STATE, action) => {
  const {
    CHANGE_PASS_RESET,
    PREVIOUS_PASSWORD_CHANGED,
    NEW_PASSWORD_CHANGED,
    REPEATED_PASSWORD_CHANGED,
    CHANGE_PASS,
    CHANGE_PASS_FAIL,
    CHANGE_PASS_SUCCESS,
  } = Actions;
  switch (action.type) {
    case PREVIOUS_PASSWORD_CHANGED:
      return {
        ...state,
        previousPassword: action.payload,
        mode: validate(action.payload, state.newPassword, state.repeatedPassword),
      };
    case NEW_PASSWORD_CHANGED:
      return {
        ...state,
        newPassword: action.payload,
        mode: validate(state.previousPassword, action.payload, state.repeatedPassword),
      };
    case REPEATED_PASSWORD_CHANGED:
      return {
        ...state,
        repeatedPassword: action.payload,
        mode: validate(state.previousPassword, state.newPassword, action.payload),
      };
    case CHANGE_PASS:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case CHANGE_PASS_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case CHANGE_PASS_RESET:
      return INITIAL_STATE;
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(previousPassword, newPassword, repeatedPassword) {
  if (checkPassword(newPassword)
    && checkPassword(previousPassword)
    && newPassword === repeatedPassword) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}

export const selectPreviousPassword = state => selectChangePassPage(state).previousPassword;
export const selectNewPassword = state => selectChangePassPage(state).newPassword;
export const selectMode = state => selectChangePassPage(state).mode;
export const selectError = state => selectMode(state) === PageModes.ERROR;
