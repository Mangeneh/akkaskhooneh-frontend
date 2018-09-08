import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.signUpPage.mode),
  loading: state.signUpPage.mode === PageModes.LOADING,
  disabled: state.signUpPage.mode === PageModes.DISABLED
    || state.signUpPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
