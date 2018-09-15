import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import {
  Constants, Graphics, NotificationTypes, Strings,
} from '../config';
import {
  calculateTimeDifference,
  extractNotificationSubjectUser,
  extractNotificationTime,
  extractNotificationType,
} from '../helpers';
import { strings } from '../i18n';

export default class NotificationComponent extends Component {
  render() {
    return (
      <View
        style={{
          marginBottom: 12,
          marginRight: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: Graphics.POST_CARD_RADIUS,
        }}
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
      </View>
    );
  }

  renderPic() {
    const { notification } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
          borderRadius: notification.notif_type === 1 || notification.notif_type === 4 ? Graphics.POST_CARD_RADIUS : Constants.CONTACT_THUMBNAIL_RADIUS,
        }}
        small
        source={{ uri: (notification.notif_type === 1 || notification.notif_type === 4) ? notification.data.post_picture : notification.profile_picture }}
      />
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

  renderTime() {
    const { notification } = this.props;
    return (
      <Text
        note
        style={{
          textAlign: 'right',
          fontSize: Constants.POST_TIME_FONT_SIZE,
          paddingRight: 8,
        }}
      >
        {calculateTimeDifference(extractNotificationTime(notification))}
      </Text>
    );
  }
}
