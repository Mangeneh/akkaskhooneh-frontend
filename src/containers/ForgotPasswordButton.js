import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.forgotPass.mode),
  loading: state.forgotPass.mode === PageModes.LOADING,
  disabled: state.forgotPass.mode === PageModes.DISABLED
    || state.forgotPass.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);