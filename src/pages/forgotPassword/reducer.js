import { UsersActions } from '../../actions';
import { PageModes } from '../../config';
import { checkEmail } from '../../helpers/Validators';
import { selectForgotPass } from '../../reducers';
import { Actions } from './actions';

const INITIAL_STATE = {
  mode: PageModes.DISABLED,
};

export default (state = INITIAL_STATE, action) => {
  const {
    EMAIL_CHANGED,
  } = Actions;
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        mode: validate(action.payload),
      };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

function validate(email) {
  if (checkEmail(email)) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}

export const selectMode = state => selectForgotPass(state).mode;
export const selectError = state => selectMode(state) === PageModes.ERROR;
