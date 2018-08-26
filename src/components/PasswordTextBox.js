import React, {Component} from 'react';
import {Icon, Item, Input} from 'native-base';
import {Colors, Strings, Constants, Fonts} from '../config';

export default class PasswordTextBox extends Component {
    render() {
        const {error, onChangePassword, value, reset} = this.props;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
        return (
            <Item style={{backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                  rounded error={error}>
                <Icon style={{color: Colors.ICON}} name='key'/>
                <Input placeholder={this.props.placeholder} secureTextEntry value={value}
                       fontFamily={Fonts.NORMAL_FONT}
                       style={{textAlign: 'center', fontSize: TEXT_BOX_FONT_SIZE}}
                       onChangeText={onChangePassword}/>
                <Icon name={error ? 'close-circle' : null} onPress={reset}/>
            </Item>
        );
    }
}