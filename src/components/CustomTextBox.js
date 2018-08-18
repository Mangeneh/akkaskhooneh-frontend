import React, {Component} from 'react';
import {Input} from 'native-base';

export default class CustomTextBox extends Component {
    render() {
        const {style, type, placeholder, secureTextEntry} = this.props;
        return (
            <Input
                style={style}
                type={type}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                fontFamily={'IRANSansWeb'}
            />
        );
    }
}