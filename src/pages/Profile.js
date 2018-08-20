import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content} from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import {Strings} from '../config/Strings';
import {Colors} from "../config/Colors";
import Constants from "../config/Constants";
import RoundAvatar from "../components/RoundAvatar";
import ProfileHeader from "../components/ProfileHeader";

export default class Profile extends Component {
    render() {
        const {PHOTOS, INTERESTS} = Strings;
        return (
            <Container style={{flex: 1}}>
                <ProfileHeader username={"Alireza"}/>
                <View style={{flex: 2}}>
                    <TouchableOpacity style={{marginTop: 15, marginLeft: 265}}>
                        <RoundAvatar/>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 7}}>
                    <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.ACCENT}}>
                        <Tab heading={INTERESTS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}}/>
                        <Tab heading={PHOTOS}
                             activeTextStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             textStyle={{color: Colors.TEXT, fontSize: 12, fontFamily: Constants.NORMAL_FONT}}
                             tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}}/>
                    </Tabs>
                </View>
            </Container>
        );
    }
}
