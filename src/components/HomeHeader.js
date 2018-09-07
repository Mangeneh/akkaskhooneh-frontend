import {
  Body, Header, Icon, Left, Right, Title,
} from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../config';
import { selectHomePostsIsLoading } from '../reducers/PostsReducer';

class HomeHeader extends Component {
  render() {
    const { onAddFriendsPress, postsIsLoading, title } = this.props;
    return (
      <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
        <Left style={{
          flex: 1,
          marginLeft: 16,
        }}
        >
          <TouchableOpacity onPress={onAddFriendsPress}>
            <Icon name="user-plus" type="Feather" style={{ color: 'white' }} />
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
          {(postsIsLoading) ? <ActivityIndicator size="large" /> : <View />}
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  postsIsLoading: selectHomePostsIsLoading(state),
});

export default connect(mapStateToProps, null)(HomeHeader);
