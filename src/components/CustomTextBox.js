import React, {Component} from 'react';
import {Input} from 'native-base';
import Constants from "../config/Constants";

export default class CustomTextBox extends Component {
    render() {
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
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