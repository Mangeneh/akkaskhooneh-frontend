import React, { Component } from 'react';
import { Input, StyleSheet } from 'native-base';

export default class CustomTextBox extends Component {
    render() {
        return(
            <Input
                style={this.props.style}
                type={this.props.type}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.secureTextEntry}
                fontFamily={'IRANSansWeb'}
            />
        );
    }       
}
