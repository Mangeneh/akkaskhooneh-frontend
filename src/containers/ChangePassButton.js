import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {chooseStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.changePassPage.mode),
    loading: state.changePassPage.mode === PageModes.LOADING,
    disabled: state.changePassPage.mode === PageModes.DISABLED || state.changePassPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);