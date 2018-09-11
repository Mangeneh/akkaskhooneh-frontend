import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Graphics } from '../config';

export default class TagItem extends Component {

  render() {
    return (
      <View
        style={{
          marginBottom: 12,
          marginRight: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: Constants.POST_CARD_RADIUS,
        }}
      >
          <View style={{
            justifyContent: 'center',
            alignContent: 'center' ,
          }}
          >
            <View>{this.renderName()}</View>
        </View>
        {this.renderPicture()}
      </View>
    );
  }

  renderPicture() {
    const { tag } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
          width: Constants.CONTACT_THUMBNAIL_RADIUS * 2,
          height: Constants.CONTACT_THUMBNAIL_RADIUS * 2,
          borderRadius: Constants.CONTACT_THUMBNAIL_RADIUS,
        }}
        source={{ uri: tag.picture }}
      />
    );
  }

  renderName() {
    const { tag } = this.props;
    return (
      <Text
        style={{
          fontSize: Constants.USER_NAME_FONT_SIZE,
          textAlign: 'right',
          paddingRight: 8,
        }}
      >
        {tag.name}
      </Text>
    );
  }
}