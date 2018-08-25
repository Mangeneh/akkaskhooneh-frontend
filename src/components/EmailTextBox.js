import React, {Component} from "react";
import {Icon, Item, Input} from "native-base";
import {Colors, Strings, Constants, Fonts} from "../config";

export default class EmailTextBox extends Component {
    render() {
        const {error, onChangeEmail, value, reset} = this.props;
        const {EMAIL_ADDRESS} = Strings;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS, TEXT_BOX_ELEVATION} = Constants;
        return (
            <Item style={{backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: TEXT_BOX_ELEVATION}}
                  rounded error={error}>
                <Icon style={{color: Colors.ICON}} name='mail'/>
                <Input
                    fontFamily={Fonts.NORMAL_FONT}
                    type='email' placeholder={EMAIL_ADDRESS}
                    value={value}
                    style={{textAlign: 'center', fontSize: TEXT_BOX_FONT_SIZE}}
                    onChangeText={onChangeEmail}/>
                <Icon name={error ? 'close-circle' : null} onPress={reset}/>
            </Item>
        );
    }
}