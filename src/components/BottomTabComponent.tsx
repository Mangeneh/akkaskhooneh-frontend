import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation/node_modules/react-navigation-tabs';
import { connect } from 'react-redux';
import { Colors, Pages } from '../config';
import { WithNavigation } from '../types/common';
import CustomStatusBar from './CustomStatusBar';

interface Props extends WithNavigation {
  isLoading: boolean;
}

class BottomTabComponent extends Component<Props> {
  private animation: AnimatedLottieView;

  constructor (props: Readonly<Props>) {
    super(props);
    this.onNewPostPress = this.onNewPostPress.bind(this);
  }

  public componentWillReceiveProps (nextProps: Readonly<Props>) {
    if (nextProps.isLoading) {
      this.animation.play();
    }
  }

  public render () {
    return (
      <View>
        <CustomStatusBar/>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.plusButton}
          onPress={this.onNewPostPress}
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

  public renderLoadingBar () {
    const { isLoading } = this.props;
    return (
      <LottieView
        ref={(animation: AnimatedLottieView) => this.animation = animation}
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

  private async onNewPostPress () {
    await this.authorizeGalleryCamera();
    this.props.navigation.navigate(Pages.NEW_POST);
  }

  private async authorizeGalleryCamera () {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA]);
  }
}

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    bottom: 20,
  },
});

// TODO: Complete This

const mapStateToProps = state => ({
  isLoading: false,
});

export default connect(mapStateToProps, null)(withNavigation(BottomTabComponent));
