import React, {Component} from "react";
import {Icon, Item} from "native-base";
import {Colors} from "../config/Colors";
import CustomTextBox from "./CustomTextBox";
import {Strings} from "../config/Strings";
import Constants from "../config/Constants";

export default class EmailTextBox extends Component {
    render() {
        const {error, onChangeEmail} = this.props;
        const {EMAIL_ADDRESS} = Strings;
        const {TEXT_BOX_FONT_SIZE, TEXT_BOX_RADIUS} = Constants;
        return (
            <Item style={{backgroundColor: 'white', borderRadius: TEXT_BOX_RADIUS,elevation:1}} rounded error={error}>
                <Icon style={{color: Colors.ICON}} name='mail'/>
                <CustomTextBox type='email' placeholder={EMAIL_ADDRESS}
                               style={{textAlign: 'center', fontSize: TEXT_BOX_FONT_SIZE}}
                               onChangeText={onChangeEmail}/>
                <Icon name={error ? 'close-circle' : null}/>
            </Item>
        );
    }
}