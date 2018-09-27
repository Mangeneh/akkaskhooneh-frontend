import LottieView from 'lottie-react-native';
import { Container, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import { ProfileHeader } from '../../components';
import FollowButton from '../../components/FollowButton';
import Loading from '../../components/Loading';
import {
  Colors, FollowModes, Pages, Parameters, Strings,
} from '../../config';
import { PhotoList, ProfileInfo } from '../../containers';
import { extractFollowMode } from '../../helpers';
import { strings } from '../../i18n';
import {
  selectProfileFollowStatus,
  selectProfileIsPrivate,
  selectUserInfoIsFirstFetch,
  selectUsername,
} from '../../reducers/UsersReducer';
import { createUserPhotosURL } from '../../config/URLCreators';
import BoardList from '../../containers/BoardList';

class Profile extends Component {
  componentWillMount() {
    const { updateUser, isAccessible } = this.props;
    updateUser()
      .then((response) => {
        if (isAccessible) {

        }
      });
  }

  componentDidMount() {
    const { isAccessible } = this.props;
    if (isAccessible) {
      setTimeout(this.tabs.goToPage.bind(this.tabs, 1));
    }
  }

  render() {
    const { navigation, isAccessible, userInfoIsFirstFetch } = this.props;
    const username = navigation.getParam(Parameters.USERNAME);
    return (
      <Container>
        <ProfileHeader
          username={username}
          onEditPress={() => this.onEditPress()}
          onSettingsPress={() => this.onSettingsPress()}
        />
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}
        >
          {!userInfoIsFirstFetch
            ? (
              <View>
                <View style={{
                  marginTop: 16,
                  marginRight: 16,
                  marginBottom: 8,
                }}
                >
                  <ProfileInfo username={navigation.getParam(Parameters.USERNAME)} />
                </View>
                {!(this.isSelfProfile()) ? <FollowButton username={username} /> : null}
              </View>
            ) : <Loading />}
          {isAccessible ? this.renderSharedMaterial() : this.renderPrivate()}
        </View>
      </Container>
    );
  }

  renderPrivate() {
    return (
      <LottieView
        source={require('../../assets/animations/lock')}
        loop
        autoPlay
        speed={0.5}
        style={{ width: '100%' }}
      />
    );
  }

  renderSharedMaterial() {
    return (
      <Tabs
        ref={(component) => {
          this.tabs = component;
        }}
        tabBarUnderlineStyle={{ backgroundColor: Colors.ACCENT }}
        initialPage={1}
        locked
      >
        <Tab
          heading={strings(Strings.INTERESTS)}
          activeTextStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          textStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTabStyle={{ backgroundColor: 'white' }}
        >
          {this.renderBoardList()}
        </Tab>
        <Tab
          heading={strings(Strings.PHOTOS)}
          activeTextStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          textStyle={{
            color: Colors.TEXT,
            fontSize: 12,
          }}
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
        >
          {this.renderPhotoList()}
        </Tab>
      </Tabs>
    );
  }

  renderBoardList() {
    const { navigation, selfUsername } = this.props;
    return (
      <BoardList
        username={this.isSelfProfile() ? selfUsername : navigation.getParam(Parameters.USERNAME)}
        isSelfProfile={this.isSelfProfile()}
      />
    );
  }

  renderPhotoList() {
    const { navigation, selfUsername } = this.props;
    return (
      <PhotoList
        name="user_photos_"
        id={this.isSelfProfile() ? selfUsername : navigation.getParam(Parameters.USERNAME)}
        createURL={createUserPhotosURL}
      />
    );
  }

  onEditPress() {
    this.props.navigation.navigate(Pages.PROFILE_EDIT);
  }

  onSettingsPress() {
    this.props.navigation.navigate(Pages.PROFILE_SETTINGS);
  }

  isSelfProfile() {
    const { navigation, selfUsername } = this.props;
    const username = navigation.getParam(Parameters.USERNAME);
    if (!username) {
      return true;
    }
    return username === selfUsername;
  }
}

// If no username is passed, it means this is the profile of the logged in user
const mapStateToProps = (state, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    isAccessible: !(selectProfileIsPrivate(state, username)
      && extractFollowMode(selectProfileFollowStatus(state, username)) !== FollowModes.FOLLOWED)
      || (username ? selectUsername(state) === username : true),
    isPrivate: selectProfileIsPrivate(state, username),
    followingStatus: selectProfileFollowStatus(state, username),
    userInfoIsFirstFetch: selectUserInfoIsFirstFetch(state, username),
    selfUsername: selectUsername(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const username = ownProps.navigation.getParam(Parameters.USERNAME);
  return {
    updateUser: () => dispatch(updateUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
