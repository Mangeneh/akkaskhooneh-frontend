import GlobalActions from '../../actions';
import { PageModes } from '../../config';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.NORMAL,
};

export default (state = INITIAL_STATE, action) => {
  const { SEND_POST, SEND_POST_SUCCESS, SEND_POST_FAIL } = Actions;
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
    case GlobalActions.RESET_EVERYTHING:
      return INITIAL_STATE;
    default:
      return state;
  }
};
