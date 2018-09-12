import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.NORMAL,
  image: null,
};

export default (state = INITIAL_STATE, action) => {
  const {
    IMAGE_CHANGED,
    EDIT_PROFILE,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    NORMALIZE,
    CHANGE_PROFILE_PIC_FAIL,
    CHANGE_PROFILE_PIC_SUCCESS,
  } = Actions;
  switch (action.type) {
    case NORMALIZE:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case IMAGE_CHANGED:
      return {
        ...state,
        image: action.payload,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        mode: PageModes.SUCCESS,
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case CHANGE_PROFILE_PIC_SUCCESS:
      return state;
    case CHANGE_PROFILE_PIC_FAIL:
      return state;
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
