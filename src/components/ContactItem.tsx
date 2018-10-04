import { Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Fonts, Pages, Parameters } from '../config';
import { UserInfo } from '../types/api';
import { WithNavigation } from '../types/common';

interface Props extends WithNavigation {
  user: UserInfo;
}

class ContactItem extends Component<Props> {
  constructor (props: Readonly<Props>) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  public render () {
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={this.onPress}
      >
        <View style={styles.details}>
          {this.renderUsername()}
          {this.renderFullName()}
        </View>
        {this.renderProfilePic()}
      </TouchableOpacity>
    );
  }

  private renderProfilePic () {
    const { user } = this.props;
    return (
      <Thumbnail
        style={styles.profilePicture}
        small
        circular
        source={{ uri: user.profile_picture }}
      />
    );
  }

  private renderUsername () {
    const { user } = this.props;
    return (
      <Text style={styles.usernameText}>
        {user.username}
      </Text>
    );
  }

  private renderFullName () {
    const { user } = this.props;
    return (
      <Text
        note
        style={styles.nameText}
      >
        {user.fullname}
      </Text>
    );
  }

  private onPress () {
    const { user, navigation } = this.props;
    navigation.push(Pages.OTHERS_PROFILE, { [Parameters.USERNAME]: user.username });
  }
}

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    marginRight: 8,
  },
  details: {
    flexDirection: 'column',
  },
  profilePicture: {
    alignSelf: 'center',
  },
  usernameText: {
    textAlign: 'right',
    fontSize: Fonts.NORMAL_FONT_SIZE,
    paddingRight: 8,
  },
  nameText: {
    textAlign: 'right',
    fontSize: Fonts.SUB_SUB_NORMAL_FONT_SIZE,
    paddingRight: 8,
  },
});

export default withNavigation(ContactItem);
