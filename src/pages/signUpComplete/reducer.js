import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkUsername } from '../../helpers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.NORMAL,
  image: null,
  bio: '',
  username: '',
  fullName: '',
};

export default (state = INITIAL_STATE, action) => {
  const {
    MODE_CHANGED,
    FULL_NAME_CHANGED,
    BIO_CHANGED,
    USER_NAME_CHANGED,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_UP,
    SIGN_UP_COMPLETE_RESET,
    IMAGE_CHANGED,
  } = Actions;
  switch (action.type) {
    case MODE_CHANGED:
      return {
        ...state,
        mode: action.payload,
      };
    case IMAGE_CHANGED:
      return {
        ...state,
        image: action.payload,
      };
    case USER_NAME_CHANGED:
      return {
        ...state,
        username: action.payload,
        mode: validate(action.payload),
      };
    case BIO_CHANGED:
      return {
        ...state,
        bio: action.payload,
      };
    case FULL_NAME_CHANGED:
      return {
        ...state,
        fullName: action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case SIGN_UP_COMPLETE_RESET:
      return INITIAL_STATE;
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(username) {
  if (checkUsername(username)) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}
