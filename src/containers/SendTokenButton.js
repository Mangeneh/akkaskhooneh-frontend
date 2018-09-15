import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.sendToken.mode),
  loading: state.sendToken.mode === PageModes.LOADING,
  disabled: state.sendToken.mode === PageModes.DISABLED
    || state.sendToken.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);