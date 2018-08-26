import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {chooseStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.signUpPage.mode),
    loading: state.signUpPage.mode === PageModes.LOADING,
    disabled: state.signUpPage.mode === PageModes.DISABLED,
});

export default connect(mapStateToProps, null)(SpinnerButton);