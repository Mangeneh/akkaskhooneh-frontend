import { Body, Header, Icon, Left, Right, Title, } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Colors, hitSlop } from '../config';
import { WithNavigation } from '../types/common';
import CustomStatusBar from './CustomStatusBar';

export interface Props extends WithNavigation {
  title: string;
}

export default withNavigation(({ title, navigation }: Props) => (
  <View>
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <CustomStatusBar/>
      <Left style={{
        flex: 1,
        marginLeft: 8,
      }}
      >
        <TouchableOpacity onPress={navigation.goBack} hitSlop={hitSlop}>
          <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }}/>
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
        <View/>
      </Right>
    </Header>
  </View>
));
