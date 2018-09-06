import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../config';

export default props => (
  <View>
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <Left style={{
        flex: 1,
        marginLeft: 16,
      }}
      >
        <TouchableOpacity onPress={() => props.onBackPress()}>
          <Icon type="Ionicons" name="ios-arrow-back" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {props.title}
        </Title>
      </Body>
      <Right style={{
        flex: 1,
        marginRight: 16,
      }}
      >
        <TouchableOpacity>
          <Icon />
        </TouchableOpacity>
      </Right>
    </Header>
  </View>
);
