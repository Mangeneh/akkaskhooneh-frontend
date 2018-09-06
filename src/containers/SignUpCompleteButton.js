import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.signUpCompletePage.mode),
  loading: state.signUpCompletePage.mode === PageModes.LOADING,
  disabled: state.signUpCompletePage.mode === PageModes.DISABLED
    || state.signUpCompletePage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
