import { Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Constants, Graphics, NotificationTypes, Pages, Parameters, Strings,
} from '../config';
import {
  calculateTimeDifference,
  extractNotificationPostID,
  extractNotificationPostPicture,
  extractNotificationProfilePicture,
  extractNotificationSubjectUser,
  extractNotificationTime,
  extractNotificationType,
} from '../helpers';
import { strings } from '../i18n';

class NotificationComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 12,
          marginRight: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: Graphics.POST_CARD_RADIUS,
        }}
        onPress={() => this.onPress()}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
        >
          <View>{this.renderMessage()}</View>
          <View>{this.renderTime()}</View>
        </View>
        {this.renderPic()}
      </TouchableOpacity>
    );
  }

  renderPic() {
    const { notification } = this.props;
    const isLikeOrComment = this.isLikeOrComment();
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
          borderRadius: isLikeOrComment ? Graphics.POST_CARD_RADIUS : Constants.CONTACT_THUMBNAIL_RADIUS,
        }}
        small
        source={{ uri: isLikeOrComment ? extractNotificationPostPicture(notification) : extractNotificationProfilePicture(notification) }}
      />
    );
  }

  renderMessage() {
    const { notification } = this.props;
    return (
      <Text
        style={{
          fontSize: Constants.POST_NAME_FONT_SIZE,
          textAlign: 'right',
          paddingRight: 8,
        }}
      >
        {this.getMessageType(extractNotificationSubjectUser(notification))}
      </Text>
    );
  }

  getMessageType(name) {
    const { notification } = this.props;
    switch (extractNotificationType(notification)) {
      case NotificationTypes.LIKE:
        return (strings(Strings.LIKE_NOTIFICATION, { name }));
      case NotificationTypes.FOLLOW:
        return (strings(Strings.FOLLOW_NOTIFICATION, { name }));
      case NotificationTypes.FOLLOW_REQUEST:
        return (strings(Strings.FOLLOW_REQUEST_NOTIFICATION, { name }));
      case NotificationTypes.COMMENT:
        return (strings(Strings.COMMENT_NOTIFICATION, { name }));
      default:
        return ('');
    }
  }

  renderTime() {
    const { notification } = this.props;
    return (
      <Text
        note
        style={{
          textAlign: 'right',
          fontSize: Graphics.POST_TIME_FONT_SIZE,
          paddingRight: 8,
        }}
      >
        {calculateTimeDifference(extractNotificationTime(notification))}
      </Text>
    );
  }

  onPress() {
    const { navigation, notification } = this.props;
    if (this.isLikeOrComment()) {
      navigation.push(Pages.POST_INFO_PAGE, { [Parameters.POST_ID]: extractNotificationPostID(notification) });
    }else {
      // todo
      // navigation.push(Pages.OTHERS_PROFILE, {[Parameters.USERNAME]: extractNo})
    }
  }

  isLikeOrComment() {
    const { notification } = this.props;
    return extractNotificationType(notification) === NotificationTypes.LIKE
      || extractNotificationType(notification) === NotificationTypes.COMMENT;
  }
}

export default withNavigation(NotificationComponent);
