import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Colors, Graphics } from '../config';
import CustomStatusBar from './CustomStatusBar';

const BackHeader = ({ title, navigation }) => (
  <View>
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <CustomStatusBar />
      <Left style={{
        flex: 1,
        marginLeft: 8,
      }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={Graphics.HIT_SLOP}>
          <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {title}
        </Title>
      </Body>
      <Right style={{
        flex: 1,
        marginRight: 16,
      }}
      >
        <View />
      </Right>
    </Header>
  </View>
);

export default withNavigation(BackHeader);
