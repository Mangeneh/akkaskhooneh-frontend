import React, {Component} from 'react';
import {Input} from 'native-base';

export default class CustomTextBox extends Component {
    render() {
        const {style, type, placeholder, secureTextEntry, disabled, onChangeText} = this.props;
        return (
            <Input
                style={style}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                secureTextEntry={secureTextEntry}
                fontFamily={'IRANSansWeb'}
                onChangeText={onChangeText}
            />
        );
    }
}