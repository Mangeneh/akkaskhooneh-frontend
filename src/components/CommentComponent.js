import { Text, Thumbnail } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { Constants, Graphics, Colors, Pages, Parameters } from '../config';
import { calculateTimeDifference, extractUserUsername } from '../helpers';
import { withNavigation } from 'react-navigation';


class CommentComponent extends Component {
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
            <TouchableOpacity onPress={() => this.onPress(this.props.comment.username)}>{this.renderUsername()}</TouchableOpacity>
          </View>
          <View style={{ marginLeft: 40 }}>{this.renderCommentText()}</View>
        </View>
        <TouchableOpacity onPress={() => this.onPress(this.props.comment.username)}>
          {this.renderProfilePic()}
        </TouchableOpacity>
      </View>
    );
  }

  renderProfilePic() {
    const { comment } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'flex-start',
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
        color: Colors.ICON,
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
        {calculateTimeDifference(comment.time)}
      </Text>
    );
  }

  onPress(username) {
    const { navigation } = this.props;
    navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: username });
  }
}

export default withNavigation(CommentComponent);
