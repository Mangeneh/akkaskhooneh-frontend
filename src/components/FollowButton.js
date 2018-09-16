import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { deleteFollowRequest, followRequest, unFollowRequest } from '../actions';
import {
  Colors, FollowModes, Graphics, Strings, Constants,
} from '../config';
import { extractFollowMode } from '../helpers';
import { strings } from '../i18n';
import { selectProfileFollowStatus } from '../reducers/UsersReducer';

class FollowButton extends Component {
  render() {
    const buttonSettings = this.makeButtonSettings();
    return (
      <Button
        onPress={() => this.onPress()}
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

  onPress() {
    const {
      followStatus, followRequest, unFollowRequest, deleteFollowRequest,
    } = this.props;
    const followMode = extractFollowMode(followStatus);
    switch (followMode) {
      case FollowModes.FOLLOWED:
        unFollowRequest();
        break;
      case FollowModes.NOT_FOLLOWED:
        followRequest();
        break;
      case FollowModes.REQUESTED:
        deleteFollowRequest();
        break;
    }
  }
}

const styles = StyleSheet.create({
  buttonFollowed: {
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    backgroundColor: Colors.ACCENT,
  },
  buttonNotFollowed: {
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    borderWidth: Graphics.FOLLOW_BUTTON_BORDER_WIDTH,
    borderColor: Colors.ACCENT,
    backgroundColor: 'white',
  },
  buttonRequested: {
    width: Graphics.FOLLOW_BUTTON_WIDTH,
    height: Graphics.FOLLOW_BUTTON_HEIGHT,
    borderRadius: Graphics.FOLLOW_BUTTON_BORDER_RADIUS,
    backgroundColor: Colors.ACCENT,
  },
  textFollowed: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    color: 'white',
  },
  textNotFollowed: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    color: Colors.ACCENT,
  },
  textRequested: {
    fontSize: Constants.TEXT_NORMAL_SIZE,
    color: 'white',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  return {
    followStatus: selectProfileFollowStatus(state, username),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { username } = ownProps;
  return {
    followRequest: () => dispatch(followRequest(username)),
    unFollowRequest: () => dispatch(unFollowRequest(username)),
    deleteFollowRequest: () => dispatch(deleteFollowRequest(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
