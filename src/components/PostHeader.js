import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Colors } from '../config';

const PostHeader = ({ navigation, title }) => (
  <View>
    <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
      <Left style={{
        flex: 1,
        marginLeft: 16,
      }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        {/* <TouchableOpacity>
              <Icon name="more-horizontal" type="Feather" style={{ color: 'white' }} />
            </TouchableOpacity> */}
      </Right>
    </Header>
  </View>
);

export default withNavigation(PostHeader);
