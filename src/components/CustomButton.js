import React, {Component} from 'react';
import {Container, Button, Text, Icon, Spinner} from 'native-base';
import {LayoutAnimation, StyleSheet, UIManager} from "react-native";

class CustomButton extends Component {

    componentWillUpdate() {
        // UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.spring();
    }

    render() {
        return (
            <Button onPress={this.props.onPress} block success
                    style={this.props.mode ? style.loading : style.normal}>
                {this.renderButton()}
            </Button>
        );
    }

    renderButton() {
        const {text, icon, mode} = this.props;
        if (mode) {
            return (
                <Spinner color='green'/>
            )
        } else {
            return (
                <Text style={style.text}>{text}</Text>
                // <Icon type={"MaterialCommunityIcons"} name={icon}/>
            )
        }
    }
}

const style = StyleSheet.create({
    normal: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 300, height: 50,
        backgroundColor: "#00541a",
        borderRadius: 10
    },
    loading: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30, marginTop: 15,
        width: 50, height: 50,
        backgroundColor: "#00541a",
        borderRadius: 10
    },
    text: {
        fontFamily: 'IRANSansWeb'
    }
});

export default CustomButton;