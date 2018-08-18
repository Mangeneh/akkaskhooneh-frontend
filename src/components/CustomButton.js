import React, {Component} from 'react';
import {Container, Button, Text, Icon} from 'native-base';
import {StyleSheet} from "react-native";

class CustomButton extends Component {
    render() {
        const {text, icon, onPress} = this.props;
        return (
            <Container>
                <Button onPress={onPress} block success style={style.button}>
                    <Icon type={"MaterialCommunityIcons"} name={icon}/>
                    <Text style={style.text}>{text}</Text>
                </Button>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginRight: 30, marginLeft: 30,
        width: 300, height: 50,
        backgroundColor: "#008464",
        borderRadius: 10
    },
    text: {
        fontFamily: 'IRANSansWeb',
    }
});

export default CustomButton;