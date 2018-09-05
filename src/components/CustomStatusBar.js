import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Colors} from "../config/Colors";

export default class CustomStatusBar extends Component {
    render() {
        return (<StatusBar barStyle='light-content' backgroundColor={Colors.BASE}/>);
    }
}