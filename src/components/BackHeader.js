import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from "../config/Colors";
import {Strings} from "../config/Strings";
import Constants from "../config/Constants";

export default class BackHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity onPress={() => {this.props.onBackPress()}} >
                            <Icon type={"Ionicons"} name='ios-arrow-back' style={{color: 'white'}}/>    
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                        <Title style={{alignSelf: 'center', color: 'white'}}>{this.props.username}</Title>
                    </Body>
                </Header>
            </View>
        );
    }
}