import { connect } from 'react-redux';
import { SpinnerButton } from '../components';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.loginPage.mode),
  loading: state.loginPage.mode === PageModes.LOADING,
  disabled: state.loginPage.mode === PageModes.DISABLED
    || state.loginPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
