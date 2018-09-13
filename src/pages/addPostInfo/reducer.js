import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { selectAddPostInfoPage } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
  const {
    SEND_POST, SEND_POST_SUCCESS, SEND_POST_FAIL, NORMALIZE,
  } = Actions;
  switch (action.type) {
    case SEND_POST:
      return {
        ...state,
        mode: PageModes.LOADING,
      };
    case SEND_POST_FAIL:
      return {
        ...state,
        mode: PageModes.ERROR,
      };
    case SEND_POST_SUCCESS:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case NORMALIZE:
      return {
        ...state,
        mode: PageModes.NORMAL,
      };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectMode = state => selectAddPostInfoPage(state).mode;
