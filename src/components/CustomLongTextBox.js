import React, {Component} from 'react';
import {Textarea} from 'native-base';

export default class CustomLongTextBox extends Component {
    render() {
        const {style, type, placeholder, secureTextEntry, disabled} = this.props;
        return (
            <Textarea
                rowSpan={5}
                style={style}
                placeholder={placeholder}
                disabled={disabled}
                fontFamily={'IRANSansWeb'}
            />
        );
    }
}