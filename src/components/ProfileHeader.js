import {
  Body, Header, Icon, Left, Right, Text, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors, Strings } from '../config';
import { strings } from '../i18n';
import CustomStatusBar from './CustomStatusBar';

export default props => (
  <View>
    <Header
      androidStatusBarColor={Colors.BASE}
      style={{ backgroundColor: Colors.BASE }}
      hasTabs
    >
      <CustomStatusBar />
      <Left style={{
        flex: 1,
        marginLeft: 16,
      }}
      >
        <TouchableOpacity onPress={() => props.onEditPress()}>
          <Text style={{ color: 'white' }}>{strings(Strings.EDIT)}</Text>
        </TouchableOpacity>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {props.username}
        </Title>
      </Body>
      <Right style={{
        flex: 1,
        marginRight: 16,
      }}
      >
        <TouchableOpacity onPress={() => props.onSettingsPress()}>
          <Icon type="MaterialCommunityIcons" name="ship-wheel" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Right>
    </Header>
  </View>
);
