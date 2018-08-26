import React, {Component} from 'react';
import {Textarea, Form, Content} from 'native-base';
import {Fonts} from '../config';

export default class CustomLongTextBox extends Component {
    render() {
        const {style, placeholder, disabled, value, onChangeText} = this.props;
        return (
            <Content>
                <Form>
                <Textarea
                    rowSpan={5}
                    style={style}
                    placeholder={placeholder}
                    disabled={disabled}
                    fontFamily={Fonts.NORMAL_FONT}
                    value={value}
                    onChangeText={onChangeText}
                />
                </Form>
            </Content>
        );
    }
}