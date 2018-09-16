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
    const { title } = this.props;
    return (
      <Header androidStatusBarColor={Colors.BASE} style={{ backgroundColor: Colors.BASE }}>
        <Body style={{ flex: 1 }}>
          <Title style={{
            alignSelf: 'center',
            color: 'white',
          }}
          >
            {title}
          </Title>
        </Body>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  postsIsLoading: selectHomePostsIsLoading(state),
});

export default connect(mapStateToProps, null)(HomeHeader);
