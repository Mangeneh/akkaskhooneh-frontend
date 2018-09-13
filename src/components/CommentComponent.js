import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Graphics } from '../config';
import { timeDiff } from '../helpers/timeDiff';

export default class CommentComponent extends Component {
  render() {
    return (
      <View
        style={{
          marginBottom: 8,
          marginRight: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: Constants.POST_CARD_RADIUS,
        }}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          >
            <View>{this.renderTime()}</View>
            <View>{this.renderUsername()}</View>
          </View>
          <View style={{ marginLeft: 40 }}>{this.renderCommentText()}</View>
        </View>
        {this.renderProfilePic()}
      </View>
    );
  }

  renderProfilePic() {
    const { comment } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
          width: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
          height: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
          borderRadius: Constants.COMMENT_THUMBNAIL_RADIUS,
        }}
        source={{ uri: comment.profile_picture }}
      />
    );
  }

  renderCommentText() {
    const { comment } = this.props;
    return (
      <Text style={{
        fontSize: Graphics.COMMENTS_TEXT_SIZE,
        textAlign: 'right',
        paddingRight: 8,
      }}
      >
        {comment.comment}
      </Text>
    );
  }

  renderUsername() {
    const { comment } = this.props;
    return (
      <Text
        style={{
          fontSize: Constants.POST_NAME_FONT_SIZE,
          textAlign: 'right',
          paddingRight: 8,
        }}
      >
        {comment.username}
      </Text>
    );
  }

  renderTime() {
    const { comment } = this.props;
    return (
      <Text
        note
        style={{
          textAlign: 'right',
          fontSize: Constants.POST_TIME_FONT_SIZE,
          paddingRight: 8,
        }}
      >
        {timeDiff(comment.time)}
      </Text>
    );
  }
}
