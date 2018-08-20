import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content } from 'native-base';
import {TouchableOpacity, View} from 'react-native'
import {Strings} from '../config/Strings';
import {Colors} from "../config/Colors";
import RoundAvatar from "../components/RoundAvatar";

export default class Profile extends Component {
  render() {
    const {PHOTOS, INTERESTS} = Strings;
    return (
      <Container style = {{flex: 1}}>
        <Header />
        <View style = {{flex: 2}}>
            <TouchableOpacity style={{marginTop: 15, marginLeft: 265}}>
                <RoundAvatar />
            </TouchableOpacity>
        </View>
        <View style = {{flex: 7}}>
            <Tabs>
              <Tab heading={<TabHeading><Text style={{fontSize: 12}}>{INTERESTS}</Text></TabHeading>} activeTextStyle={{color: Colors.BASE_COLOR}}>
              </Tab>
              <Tab heading={<TabHeading><Text style={{fontSize: 12, }}>{PHOTOS}</Text></TabHeading>} activeTextStyle={{color: Colors.BASE_COLOR}}>
              </Tab>
            </Tabs>
        </View>
      </Container>
    );
  }
}
