import React, {Component} from 'react';
import {Text} from "native-base";
import {strings} from "../i18n";
import {Strings} from "../config";

export default class PasswordInstruction extends Component {
    render() {
        return (
            <Text note style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 10,
                marginTop: 4
            }}>{strings(Strings.PASSWORD_INSTRUCTION)}</Text>
        );
    }
}