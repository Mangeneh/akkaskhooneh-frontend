import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { PermissionsAndroid, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { Colors } from '../config';
import { Pages } from '../config/Pages';
import NavigationService from '../NavigationService';
import {
  selectNotificationsIsLoading,
  selectNotificationsIsRefreshing,
} from '../pages/notification/reducer';
import {
  selectSearchTopTagsIsLoading,
  selectSearchTopTagsIsRefreshing,
} from '../pages/search/reducer';
import { selectUserBoardsIsLoading, selectUserBoardsIsRefreshing } from '../reducers/BoardsReducer';
import {
  selectHomePostsIsLoading,
  selectHomePostsIsRefreshing,
  selectUserPhotosIsLoading,
  selectUserPhotosIsRefreshing,
} from '../reducers/posts';
import CustomStatusBar from './CustomStatusBar';

class BottomTabComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.animation.play();
    }
  }

  render() {
    return (
      <View>
        <CustomStatusBar />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            zIndex: 10,
            alignSelf: 'center',
            bottom: 20,
          }}
          onPress={() => this.onNewPostPress()}
        >
          <Icon
            name="plus"
            type="material-community"
            color="white"
            raised
            size={30}
            containerStyle={{ backgroundColor: Colors.ACCENT }}
          />
        </TouchableOpacity>
        {this.renderLoadingBar()}
        <View style={{ zIndex: 1 }}>
          <MaterialTopTabBar {...this.props} />
        </View>
      </View>
    );
  }

  renderLoadingBar() {
    const { isLoading } = this.props;
    return (
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        source={require('../assets/animations/progress_bar')}
        loop={isLoading}
        style={{
          width: 75,
          position: 'absolute',
          zIndex: isLoading ? 5 : 0,
          alignSelf: 'center',
          bottom: -8,
        }}
      />
    );
  }

  async onNewPostPress() {
    await this.authorizeGalleryCamera();
    NavigationService.navigate(Pages.NEW_POST);
  }

  async authorizeGalleryCamera() {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA]);
  }
}

const mapStateToProps = state => ({
  isLoading: selectUserBoardsIsLoading(state)
    || selectUserBoardsIsRefreshing(state)
    || selectUserPhotosIsLoading(state)
    || selectUserPhotosIsRefreshing(state)
    // || selectHomePostsIsLoading(state)
    // || selectHomePostsIsRefreshing(state)
    || selectSearchTopTagsIsLoading(state)
    || selectSearchTopTagsIsRefreshing(state)
    || selectNotificationsIsLoading(state)
    || selectNotificationsIsRefreshing(state),
});

export default connect(mapStateToProps, null)(BottomTabComponent);
