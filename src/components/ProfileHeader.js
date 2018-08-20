import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {Colors} from "../config/Colors";
import {Strings} from "../config/Strings";
import Constants from "../config/Constants";

export default class ProfileHeader extends Component {
    render() {
        return (
            <Container>
                <Header androidStatusBarColor={Colors.BASE} style={{backgroundColor: Colors.BASE}}>
                    <Left style={{flex: 1, marginLeft: 15}}>
                        <TouchableOpacity>
                            <Text style={{color: 'white', fontFamily: Constants.BOLD_FONT}}>{Strings.EDIT}</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex: 3}}>
                    <Title style={{alignSelf: 'center'}}>{this.props.username}</Title>
                    </Body>
                    <Right style={{flex: 1, marginRight: 15}}>
                        <TouchableOpacity>
                            <Icon type={"MaterialCommunityIcons"} name='ship-wheel' style={{color: 'white'}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </Container>
        );
    }
}