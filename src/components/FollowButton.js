import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FollowModes, Strings } from '../config';
import { strings } from '../i18n';

export default class FollowButton extends Component {
  render() {
    const { onPress } = this.props;
    const buttonSettings = this.makeButtonSettings();
    return (
      <Button
        onPress={onPress}
        block
        style={buttonSettings.style}
      >
        <Text>{buttonSettings.text}</Text>
      </Button>
    );
  }

  makeButtonSettings() {
    const { mode } = this.props;
    switch (mode) {
      case FollowModes.FOLLOWED:
        return {
          text: strings(Strings.FOLLOWED),
          style: styles.followed,
        };
      case FollowModes.NOT_FOLLOWED:
        return {
          text: strings(Strings.FOLLOW),
          style: styles.notFollowed,
        };
      case FollowModes.REQUESTED:
        return {
          text: strings(Strings.REQUESTED),
          style: styles.requested,
        };
    }
  }
}

const styles = StyleSheet.create({
  followed: {},
  notFollowed: {},
  requested: {},
});
