import {connect} from 'react-redux';
import {SpinnerButton} from '../components'
import {chooseStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.loginPage.mode),
    loading: state.loginPage.mode === PageModes.LOADING,
    disabled: state.loginPage.mode === PageModes.DISABLED || state.loginPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);