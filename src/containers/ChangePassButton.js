import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.changePassPage.mode),
  loading: state.changePassPage.mode === PageModes.LOADING,
  disabled: state.changePassPage.mode === PageModes.DISABLED
    || state.changePassPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
