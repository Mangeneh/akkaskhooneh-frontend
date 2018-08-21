import {connect} from 'react-redux';
import SpinnerButton from "../components/SpinnerButton";
import {StyleSheet} from "react-native";
import {Colors} from "../config/Colors";
import {ProfileEditPageModes} from "../config/ProfileEditPageModes";

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
    loading: state.profileEditPage.mode === ProfileEditPageModes.LOADING,
});

function chooseStyle(mode) {
    switch (mode) {
        case ProfileEditPageModes.LOADING:
            return styles.loadingStyle;
        default:
            return styles.normalStyle;
    }
}

export default connect(mapStateToProps, null)(SpinnerButton);