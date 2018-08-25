import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {ButtonStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.signUpPage.mode),
    loading: state.signUpPage.mode === PageModes.LOADING,
    disabled: state.signUpPage.mode === PageModes.DISABLED,
});

function chooseStyle(signUpMode) {
    const {LOADING, ERROR, DISABLED} = PageModes;
    switch (signUpMode) {
        case LOADING:
            return ButtonStyle.loadingStyle;
        case ERROR:
            return ButtonStyle.errorStyle;
        case DISABLED:
            return ButtonStyle.disabledStyle;
        default:
            return ButtonStyle.normalStyle;
    }
}

export default connect(mapStateToProps, null)(SpinnerButton);