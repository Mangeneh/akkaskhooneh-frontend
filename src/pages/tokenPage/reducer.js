import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkPassword } from '../../helpers/Validators';
import { selectSendToken } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.DISABLED,
};

export default (state = INITIAL_STATE, action) => {
  const {
    CODE_CHANGED,
  } = Actions;
  switch (action.type) {
    case CODE_CHANGED:
      return {
        mode: validate(action.payload),
      };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(code) {
  if (code.length === 6) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}

export const selectMode = state => selectSendToken(state).mode;
export const selectError = state => selectMode(state) === PageModes.ERROR;
