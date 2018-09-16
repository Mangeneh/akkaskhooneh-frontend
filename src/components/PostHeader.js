import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../config';

export default class PostHeader extends Component {
  render() {
    return (
      <View>
        <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
          <Left style={{
            flex: 1,
            marginLeft: 16,
          }}
          >
            <TouchableOpacity onPress={() => this.props.onBackPress()}>
              <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }} />
            </TouchableOpacity>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{
              alignSelf: 'center',
              color: 'white',
            }}
            >
              {this.props.title}
            </Title>
          </Body>
          <Right style={{
            flex: 1,
            marginRight: 16,
          }}
          >
            {/* <TouchableOpacity>
              <Icon name="more-horizontal" type="Feather" style={{ color: 'white' }} />
            </TouchableOpacity> */}
          </Right>
        </Header>
      </View>
    );
  }
}
