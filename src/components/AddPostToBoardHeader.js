import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors, Strings } from '../config';
import { strings } from '../i18n';

export default props => (
  <View>
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <Left style={{
        flex: 1,
        marginLeft: 16,
      }}
      >
        <View />
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {strings(Strings.YOUR_PHOTOS)}
        </Title>
      </Body>
      <Right style={{
        flex: 1,
        marginRight: 16,
      }}
      >
        <TouchableOpacity onPress={() => props.onClosePress()}>
          <Icon name="close" type="MaterialCommunityIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Right>
    </Header>
  </View>
);
