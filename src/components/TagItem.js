import { Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Constants, Pages, Parameters } from '../config';
import { extractTagID, extractTagName, extractTagPictureUri } from '../helpers';

class TagItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 12,
          marginRight: 4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          borderRadius: Constants.POST_CARD_RADIUS,
        }}
        onPress={() => this.onPress()}
      >
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {this.renderName()}
        </View>
        {this.renderPicture()}
      </TouchableOpacity>
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
        source={{ uri: extractTagPictureUri(tag) }}
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
        {extractTagName(tag)}
      </Text>
    );
  }

  onPress() {
    const { tag, navigation } = this.props;
    navigation.push(Pages.TAGS_PHOTOS, {
      [Parameters.TAG_ID]: extractTagID(tag),
      [Parameters.TAG_NAME]: extractTagName(tag),
    });
  }
}

export default withNavigation(TagItem);
