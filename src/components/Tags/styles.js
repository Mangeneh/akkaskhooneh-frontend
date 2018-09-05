import {StyleSheet} from "react-native";
import {Graphics, Colors} from "../../config";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    textInputContainer: {
        flex: 1,
        minWidth: 100,
        height: 32,
        borderRadius: Graphics.BOX_RADIUS,
        backgroundColor: Colors.LIGHT_GRAY
    },
    textInput: {
        margin: 0,
        padding: 0,
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
        height: 32,
        fontSize: Graphics.TEXT_NORMAL_SIZE,
        color: Colors.TEXT
    },
    tag: {
        justifyContent: "center",
        backgroundColor: Colors.ACCENT,
        borderRadius: 16,
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        margin: 4
    },
    tagLabel: {
        color: 'white',
        fontSize: Graphics.TEXT_NORMAL_SIZE
    }
});