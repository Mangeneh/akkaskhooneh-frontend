import GlobalActions from '../../actions';
import { PageModes } from '../../config';
import { checkEmail } from '../../helpers/Validators';
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
    default:
        return state;
};
}

function validate(email) {
  if (checkEmail(email)) {
    return PageModes.NORMAL;
  }
  return PageModes.DISABLED;
}
