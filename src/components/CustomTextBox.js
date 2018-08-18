import React, { Component } from 'react';
import { Input } from 'native-base';

export default class CustomTextBox extends Component {
    render() {
        return(
            <Input
                style={{textAlign: 'center'}}
                rounded
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.secureTextEntry}
            />
        );
    }       
}