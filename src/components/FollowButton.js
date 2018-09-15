import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FollowModes, Strings } from '../config';
import { extractFollowMode } from '../helpers';
import { strings } from '../i18n';
import { selectProfileFollowStatus } from '../reducers/UsersReducer';

class FollowButton extends Component {
  render() {
    console.log("follow button");
    console.log(this.props);
    const { onPress } = this.props;
    const buttonSettings = this.makeButtonSettings();
    console.log(buttonSettings);
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
    const { followStatus } = this.props;
    const followMode = extractFollowMode(followStatus);
    switch (followMode) {
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

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps;
  return {
    followStatus: selectProfileFollowStatus(state, username),
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
