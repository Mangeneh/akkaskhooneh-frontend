import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Colors, FollowModes, Graphics, Strings,
} from '../config';
import { extractFollowMode } from '../helpers';
import { strings } from '../i18n';
import { selectProfileFollowStatus } from '../reducers/UsersReducer';

class FollowButton extends Component {
  render() {
    const { onPress } = this.props;
    const buttonSettings = this.makeButtonSettings();
    return (
      <Button
        onPress={onPress}
        block
        style={buttonSettings.buttonStyle}
      >
        <Text style={buttonSettings.textStyle}>{buttonSettings.text}</Text>
      </Button>
    );
  }

  makeButtonSettings() {
    const { followStatus } = this.props;
    const followMode = extractFollowMode(followStatus);
    switch (followMode) {
      case FollowModes.FOLLOWED:
        return {
          text: strings(Strings.FOLLOWED),
          buttonStyle: styles.buttonFollowed,
          textStyle: styles.textFollowed,
        };
      case FollowModes.NOT_FOLLOWED:
        return {
          text: strings(Strings.FOLLOW),
          buttonStyle: styles.buttonNotFollowed,
          textStyle: styles.textNotFollowed,
        };
      case FollowModes.REQUESTED:
        return {
          text: strings(Strings.REQUESTED),
          buttonStyle: styles.buttonRequested,
          textStyle: styles.textRequested,
        };
    }
  }
}

const styles = StyleSheet.create({
  buttonFollowed: {
    alignSelf: 'center',
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    backgroundColor: Colors.ACCENT,
  },
  buttonNotFollowed: {
    alignSelf: 'center',
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    borderWidth: Graphics.FOLLOW_BUTTON_BORDER_WIDTH,
    borderColor: Colors.ACCENT,
    backgroundColor: 'white',
  },
  buttonRequested: {
    alignSelf: 'center',
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    backgroundColor: Colors.ACCENT,
  },
  textFollowed: {
    color: 'white',
  },
  textNotFollowed: {
    color: Colors.ACCENT,
  },
  textRequested: {
    color: 'white',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  return {
    followStatus: selectProfileFollowStatus(state, username),
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
