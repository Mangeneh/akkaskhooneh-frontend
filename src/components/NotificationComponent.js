import { Text, Thumbnail, Icon } from 'native-base';
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Constants, Graphics, NotificationTypes, Pages, Parameters, Strings, Colors,
} from '../config';
import {
  calculateTimeDifference,
  extractNotificationObjectUser,
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
          flex: 1,
        }}
        onPress={() => this.onPress()}
      >
        { extractNotificationType(this.props.notification) === NotificationTypes.FOLLOW_REQUEST ? this.renderAcceptOrDenyButtons() : <View />}
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

  renderAcceptOrDenyButtons() {
    const { notification } = this.props;
    return (
      <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.props.sendRespondForFollowRequest(false, extractNotificationSubjectUser(notification))}>
          <Icon name="close" type="MaterialCommunityIcons" style={styles.item} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.sendRespondForFollowRequest(true, extractNotificationSubjectUser(notification))}>
          <Icon name="check" type="MaterialCommunityIcons" style={styles.item} />
        </TouchableOpacity>
      </View>
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
      case NotificationTypes.OTHERS_FOLLOW:
        return (strings(Strings.OTHERS_FOLLOW, {
          subject: name,
          object: extractNotificationObjectUser(notification),
        }));
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
    } else {
      navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: extractNotificationSubjectUser(notification) });
    }
  }

  isLikeOrComment() {
    const { notification } = this.props;
    return extractNotificationType(notification) === NotificationTypes.LIKE
      || extractNotificationType(notification) === NotificationTypes.COMMENT;
  }
}

const styles = StyleSheet.create({
  item: {
    color: Colors.ICON,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
  },
});

export default withNavigation(NotificationComponent);
