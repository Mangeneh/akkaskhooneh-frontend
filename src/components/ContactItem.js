import { Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Constants, Pages, Parameters } from '../config';
import { extractUserFullName, extractUserProfilePictureUri, extractUserUsername } from '../helpers';

class ContactItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 12,
          marginRight: 8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
        onPress={() => this.onPress()}
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
            {this.renderUsername()}
          </View>
          {this.renderFullName()}
        </View>
        {this.renderProfilePic()}
      </TouchableOpacity>
    );
  }

  renderProfilePic() {
    const { user } = this.props;
    return (
      <Thumbnail
        style={{
          alignSelf: 'center',
        }}
        small
        circular
        source={{ uri: extractUserProfilePictureUri(user) }}
      />
    );
  }

  renderUsername() {
    const { user } = this.props;
    return (
      <Text
        style={{
          fontSize: Constants.USER_NAME_FONT_SIZE,
          textAlign: 'right',
          paddingRight: 8,
        }}
      >
        {extractUserUsername(user)}
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
          fontSize: Constants.FULL_NAME_FONT_SIZE,
          paddingRight: 8,
        }}
      >
        {extractUserFullName(user)}
      </Text>
    );
  }

  onPress() {
    const { user, navigation } = this.props;
    navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: extractUserUsername(user) });
  }
}

export default withNavigation(ContactItem);
