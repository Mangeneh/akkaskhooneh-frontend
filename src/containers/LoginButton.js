import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {StyleSheet} from "react-native";
import {Colors} from "../config/Colors";

const styles = StyleSheet.create({
    normalStyle: {
        alignSelf: 'center',
        marginRight: 32, marginLeft: 32, marginTop: 16,
        width: 300, height: 50,
        backgroundColor: Colors.ACCENT,
        borderRadius: 10
    },
    loadingStyle: {
        alignSelf: 'center',
        marginRight: 32, marginLeft: 32, marginTop: 16,
        width: 300, height: 50,
        backgroundColor: Colors.ACCENT,
        borderRadius: 10
    },
    errorStyle: {
        alignSelf: 'center',
        marginRight: 32, marginLeft: 32, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: Colors.ERROR,
        borderRadius: 10
    },
    disabledStyle: {
        alignSelf: 'center',
        marginRight: 32, marginLeft: 32, marginTop: 16,
        width: 300, height: 50,
        backgroundColor: Colors.DISABLED,
        borderRadius: 10
    }
});

const mapStateToProps = (state) => ({
    style: chooseStyle(state.loginPage.mode),
    loading: state.loginPage.mode === 'LOADING',
    disabled: state.loginPage.mode === 'DISABLED',
});

function chooseStyle(loginMode) {
    switch (loginMode) {
        case 'LOADING':
            return styles.loadingStyle;
        case 'ERROR':
            return styles.errorStyle;
        case 'DISABLED':
            return styles.disabledStyle;
        default:
            return styles.normalStyle;
    }
}

export default connect(mapStateToProps, null)(SpinnerButton);