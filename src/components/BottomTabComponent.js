import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { Colors, Pages } from '../config';
import NavigationService from '../NavigationService';
import { selectUserBoardsIsLoading } from '../reducers/BoardsReducer';
import { selectHomePostsIsLoading, selectUserPhotosIsLoading } from '../reducers/PostsReducer';
import CustomStatusBar from './CustomStatusBar';

class BottomTabComponent extends Component {
  componentWillReceiveProps(nextProps) {
    // if (nextProps.isLoading) {
    //   this.animation.play();
    // }
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
          onPress={() => NavigationService.navigate(Pages.NEW_POST)}
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
    return null;
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
}

const mapStateToProps = state => ({
  isLoading: selectUserBoardsIsLoading(state)
    || selectUserPhotosIsLoading(state)
    || selectHomePostsIsLoading(state),
});

export default connect(mapStateToProps, null)(BottomTabComponent);
