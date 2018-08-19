import React, {Component} from 'react';
import {Textarea, Form, Content} from 'native-base';

export default class CustomLongTextBox extends Component {
    render() {
        const {style, type, placeholder, secureTextEntry, disabled} = this.props;
        return (
            <Content>
                <Form>
                <Textarea
                rowSpan={5}
                style={style}
                placeholder={placeholder}
                disabled={disabled}
                fontFamily={'IRANSansWeb'}
            />
                </Form>
            </Content>
        );
    }
}