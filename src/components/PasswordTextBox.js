import React, {Component} from "react";
import {Icon, Item, Input} from "native-base";
import {Colors} from "../config/Colors";
import CustomTextBox from "./CustomTextBox";
import {Strings} from "../config/Strings";
import Constants from "../config/Constants";

export default class PasswordTextBox extends Component {
    render() {
        const {error, onChangePassword, value} = this.props;
        const {PASSWORD} = Strings;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS} = Constants;
        return (
            <Item style={{backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS, elevation: 1}} rounded error={error}>
                <Icon style={{color: Colors.ICON}} name='key'/>
                <Input placeholder={PASSWORD} secureTextEntry value={value}
                       style={{textAlign: 'center', fontSize: TEXT_BOX_FONT_SIZE}}
                       onChangeText={onChangePassword}/>
                <Icon name={error ? 'close-circle' : null}/>
            </Item>
        );
    }
}