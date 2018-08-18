import React, { Component } from 'react';
import { Input } from 'native-base';

export default class CustomTextBox extends Component {
    render() {
        return(
            <Input
                style={this.props.style}
                type={this.props.type}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.secureTextEntry}
            />
        );
    }       
}

const style = StyleSheet.create({
    normal: {
        marginRight: 30, marginLeft: 30,
        width: 300, height: 50,
        backgroundColor: "white"
    },
    text: {
        fontFamily: 'IRANSansWeb'
    }
});