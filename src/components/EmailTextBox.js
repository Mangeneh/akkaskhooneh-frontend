import React, {Component} from 'react';
import {Icon, Item, Input} from 'native-base';
import {Colors, Strings, Constants, Fonts, Graphics} from '../config';
import {strings} from "../i18n";

export default class EmailTextBox extends Component {
    render() {
        const {error, onChangeEmail, value, reset} = this.props;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_ELEVATION} = Constants;
        const {BOX_RADIUS} = Graphics;
        return (
            <Item style={{backgroundColor: 'white', borderRadius: BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                  rounded error={error}>
                <Icon style={{color: Colors.ICON}} name='mail'/>
                <Input
                    type='email' placeholder={strings(Strings.EMAIL_ADDRESS)}
                    value={value}
                    style={{textAlign: 'center', fontSize: TEXT_BOX_FONT_SIZE}}
                    onChangeText={onChangeEmail}/>
                <Icon name={error ? 'close-circle' : null} onPress={reset}/>
            </Item>
        );
    }
}