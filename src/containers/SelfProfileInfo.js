import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Colors, Strings } from '../config';
import { strings } from '../i18n';
import {
  selectSelfBio,
  selectSelfFullName,
  selectSelfNumOfFollowers,
  selectSelfNumOfFollowings,
  selectSelfProfilePicture,
} from '../reducers/UserInfoReducer';

class SelfProfileInfo extends Component {
  render() {
    const {
      bio, fullName, followers, followings, onListPressed,
    } = this.props;
    return (
      <View style={{
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
      >
        <View style={styles.textArea}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
          >
            <TouchableOpacity onPress={onListPressed}>
              <Text style={{
                marginRight: 16,
                fontSize: 12,
                color: Colors.ICON,
              }}
              >
                {strings(Strings.NUM_OF_FOLLOWINGS, { number: followings })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onListPressed}>
              <Text style={{
                fontSize: 12,
                color: Colors.ICON,
              }}
              >
                {strings(Strings.NUM_OF_FOLLOWERS, { number: followers })}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        {this.renderAvatar()}
      </View>
    );
  }

  renderAvatar() {
    return (
      <Avatar
        height={80}
        width={80}
        rounded
        source={{ uri: this.props.profilePicture }}
      />
    );
  }
}

const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontSize: 14,
  },
  bio: {
    flex: 1,
    fontSize: 10,
    marginBottom: 12,
    color: Colors.ICON,
  },
  textArea: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginRight: 16,
    marginBottom: 4,
  },
});

const mapStateToProps = state => ({
  user: state.userInfo.user,
  bio: selectSelfBio(state),
  profilePicture: selectSelfProfilePicture(state),
  fullName: selectSelfFullName(state),
  followers: selectSelfNumOfFollowers(state),
  followings: selectSelfNumOfFollowings(state),
});

export default connect(mapStateToProps, null)(SelfProfileInfo);
