import { connect } from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import { PageModes } from '../config';
import { chooseStyle } from '../styles/ButtonStyle';

const mapStateToProps = state => ({
  style: chooseStyle(state.addPostInfoPage.mode),
  loading: state.addPostInfoPage.mode === PageModes.LOADING,
  disabled: state.addPostInfoPage.mode === PageModes.DISABLED
    || state.addPostInfoPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
