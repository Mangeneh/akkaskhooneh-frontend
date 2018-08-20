import React, {Component} from 'react';
import {Container, Tab, Tabs} from 'native-base';
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
            <Container>
                <ProfileHeader username={"Alireza"}/>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{marginTop: 16, marginRight: 16, marginBottom: 40}}>
                        <RoundAvatar
                            uri={'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Chrome-icon.png'}/>
                    </TouchableOpacity>
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
