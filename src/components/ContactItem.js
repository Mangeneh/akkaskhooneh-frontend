import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Graphics } from '../config';

export default class ContactItem extends Component {
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
            justifyContent: 'flex-end',
          }}
          >
            <View>{this.renderUsername()}</View>
          </View>
          <View style={{ marginLeft: 40 }}>{this.renderFullName()}</View>
        </View>
        {this.renderProfilePic()}
      </View>
    );
  }

  renderProfilePic() {
    const { user } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
          width: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
          height: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
          borderRadius: Constants.COMMENT_THUMBNAIL_RADIUS,
        }}
        source={{ uri: user.profile_picture }}
      />
    );
  }

  renderUsername() {
    const { user } = this.props;
    return (
      <Text
        style={{
          fontSize: Constants.POST_NAME_FONT_SIZE,
          textAlign: 'right',
          paddingRight: 8,
        }}
      >
        {user.username}
      </Text>
    );
  }

  renderFullName() {
    const { user } = this.props;
    return (
      <Text
        note
        style={{
          textAlign: 'right',
          fontSize: Constants.POST_TIME_FONT_SIZE,
          paddingRight: 8,
        }}
      >
        {user.fullname}
      </Text>
    );
  }
}
