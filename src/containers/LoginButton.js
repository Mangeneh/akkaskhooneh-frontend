import {connect} from 'react-redux';
import {SpinnerButton} from '../components'
import {ButtonStyle} from "../styles/ButtonStyle";
import {PageModes} from "../config";

const mapStateToProps = (state) => ({
    style: chooseStyle(state.loginPage.mode),
    loading: state.loginPage.mode === PageModes.LOADING,
    disabled: state.loginPage.mode === PageModes.DISABLED,
});

function chooseStyle(loginMode) {
    const {LOADING, ERROR, DISABLED} = PageModes;
    switch (loginMode) {
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