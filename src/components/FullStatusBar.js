import React, {Component} from 'react';
import {StatusBar} from 'react-native';

export default class FullStatusBar extends Component {
    render() {
        return (<StatusBar barStyle='light-content' backgroundColor={'transparent'} translucent/>);
    }
}