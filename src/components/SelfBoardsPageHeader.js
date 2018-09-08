import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../config';
import CustomStatusBar from './CustomStatusBar';

export default (props) => {
  const {
    boardName, onDeletePress, onAddPress, onBackPress,
  } = props;
  return (
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <CustomStatusBar />
      <Left style={{
        flex: 1,
        marginLeft: 4,
      }}
      >
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Left>
      <Body style={{ flex: 3 }}>
        <Title style={{
          alignSelf: 'center',
          color: 'white',
        }}
        >
          {boardName}
        </Title>
      </Body>
      <Right style={{
        flex: 1,
        marginRight: 4,
      }}
      >
        <TouchableOpacity onPress={onAddPress}>
          <Icon
            name="plus"
            type="MaterialCommunityIcons"
            style={{
              marginRight: 4,
              color: 'white',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePress}>
          <Icon name="delete" type="MaterialCommunityIcons" style={{ color: 'white' }} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
};
