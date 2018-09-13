import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkPassword } from '../../helpers/Validators';
import { selectGetNewPass } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.DISABLED,
};

export default (state = INITIAL_STATE, action) => {
  const {
    PASSWORD_CHANGED,
  } = Actions;
  switch (action.type) {
    case PASSWORD_CHANGED:
      return {
        mode: validate(action.payload),
      };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(password) {
  if (checkPassword(password)) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}

export const selectMode = state => selectGetNewPass(state).mode;
export const selectError = state => selectMode(state) === PageModes.ERROR;
