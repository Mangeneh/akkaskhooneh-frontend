import {
Body, Header, Icon, Left, Right, Title, CardItem
} from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../config';
import { selectHomePostsIsLoading } from '../reducers/PostsReducer';

export default class CommentComponent extends Component {
    render() {
        return(
            <CardItem>
            <Left />
            <Body />
            <Right style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingRight: 12,
            }}
            >
              <View style={{ flexDirection: 'column' }}>
                <Text style={{
                  fontSize: Constants.POST_NAME_FONT_SIZE,
                  textAlign: 'right',
                  paddingRight: 8,
                }}
                >
                  {postInfo.username}
                </Text>
                <Text
                  note
                  style={{
                    fontSize: Constants.POST_TIME_FONT_SIZE,
                    paddingRight: 8,
                  }}
                >
                  ۲ ساعت
                  پیش
                </Text>
                <Text />
              </View>
              <Thumbnail
                source={{ uri: postInfo.profile_picture }}
              />
            </Right>
          </CardItem>
        );
    }
}
