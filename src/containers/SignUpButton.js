import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {ButtonStyle} from "../styles/ButtonStyle";

const mapStateToProps = (state) => ({
    style: chooseStyle(state.signUpPage.mode),
    loading: state.signUpPage.mode === 'LOADING',
    disabled: state.signUpPage.mode === 'DISABLED',
});

function chooseStyle(signUpMode) {
    switch (signUpMode) {
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