import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {ButtonStyle} from "../styles/ButtonStyle";

const mapStateToProps = (state) => ({
    style: chooseStyle(state.loginPage.mode),
    loading: state.loginPage.mode === 'LOADING',
    disabled: state.loginPage.mode === 'DISABLED',
});

function chooseStyle(loginMode) {
    switch (loginMode) {
        case 'LOADING':
            return ButtonStyle.loadingStyle;
        case 'ERROR':
            return ButtonStyle.errorStyle;
        case 'DISABLED':
            return ButtonStyle.disabledStyle;
        default:
            return ButtonStyle.normalStyle;
    }
}

export default connect(mapStateToProps, null)(SpinnerButton);