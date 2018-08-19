import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {StyleSheet} from "react-native";
import {Colors} from "../config/Colors";

const styles = StyleSheet.create({
    normalStyle: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: Colors.ACCENT_COLOR,
        borderRadius: 10
    },
    loadingStyle: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: Colors.ACCENT_COLOR,
        borderRadius: 10
    },
    errorStyle: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: "#ff1a1e",
        borderRadius: 10
    }
});

const mapStateToProps = (state) => ({
    style: chooseStyle(state),
    loading: state.mode === "LOADING",
    disabled: state.emailVerification
});

function chooseStyle(state) {
    if (state.mode === 'LOADING') {
        return styles.loadingStyle;
    } else if (state.mode === 'ERROR') {
        return styles.errorStyle;
    } else {
        return styles.normalStyle;
    }
}

const mapDispatchToProps = (dispatch) => ({
    onPress: () => dispatch({type: ''})
});

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerButton);