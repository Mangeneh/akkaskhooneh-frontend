import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {ButtonStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.changePassPage.mode),
    loading: state.changePassPage.mode === PageModes.LOADING,
    disabled: state.changePassPage.mode === PageModes.DISABLED,
});

function chooseStyle(changePassMode) {
    const {LOADING, ERROR, DISABLED} = PageModes;
    switch (changePassMode) {
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