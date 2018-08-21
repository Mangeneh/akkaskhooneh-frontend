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
});

const mapStateToProps = (state) => ({
    style: chooseStyle(state.profileEditPage.mode),
    loading: state.profileEditPage.mode === 'LOADING',
});

function chooseStyle(saveMode) {
    switch (saveMode) {
        case 'LOADING':
            return styles.loadingStyle;
        default:
            return styles.normalStyle;
    }
}

export default connect(mapStateToProps, null)(SpinnerButton);