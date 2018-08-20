import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from "../config/Colors";
import {Strings} from "../config/Strings";
import Constants from "../config/Constants";

export default class ProfileHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity>
                            <Text style={{color: 'white', fontFamily: Constants.NORMAL_FONT}}>{Strings.EDIT}</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{alignSelf: 'center', color: 'white'}}>{this.props.username}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 16}}>
                        <TouchableOpacity>
                            <Icon type={"MaterialCommunityIcons"} name='ship-wheel' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>
        );
    }
}