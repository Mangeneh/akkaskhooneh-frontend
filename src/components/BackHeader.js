import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '../config';

export default class BackHeader extends Component {
    render() {
        return (
            <View>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 16}}>
                        <TouchableOpacity onPress={() => this.props.onBackPress()}>
                            <Icon type={'Ionicons'} name='ios-arrow-back' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontFamily: Fonts.NORMAL_FONT
                    }}>{this.props.title}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 16}}>
                        <TouchableOpacity>
                            <Icon/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>
        );
    }
}