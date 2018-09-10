import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Graphics } from '../config';

export default class CommentComponent extends Component {
  render() {
    const { comment } = this.props;
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: Constants.POST_CARD_RADIUS,
      }}
      >
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              note
              style={{
                fontSize: Constants.POST_TIME_FONT_SIZE,
                paddingRight: 8,
              }}
            >
              {'unknown'}
            </Text>
            <Text style={{
              fontSize: Constants.POST_NAME_FONT_SIZE,
              textAlign: 'right',
              paddingRight: 8,
            }}
            >
              {comment.username}
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: Graphics.COMMENTS_TEXT_SIZE, textAlign: 'right', paddingRight: 8 }}>{comment.comment}</Text>
          </View>
        </View>
        <Thumbnail
          style={{
            alignSelf: 'center',
            width: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
            height: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
            borderRadius: Constants.COMMENT_THUMBNAIL_RADIUS,
          }}
          source={{ uri: comment.profile_picture }}
        />
      </View>
    );
  }
}
