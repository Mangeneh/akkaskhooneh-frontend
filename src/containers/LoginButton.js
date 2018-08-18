import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    normalStyle: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: "#00541a",
        borderRadius: 10
    },
    loadingStyle: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 50, height: 50,
        backgroundColor: "#00541a",
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
    disabled: state.disabled,
    loading: state.mode === "LOADING",
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