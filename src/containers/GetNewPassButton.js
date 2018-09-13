import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.getNewPass.mode),
  loading: state.getNewPass.mode === PageModes.LOADING,
  disabled: state.getNewPass.mode === PageModes.DISABLED
    || state.getNewPass.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);