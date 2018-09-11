import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Pages } from './config';
import NavigationService from './NavigationService';
import {
  AddFriends,
  AddPostInfo,
  AddPostToBoard,
  BoardsPage,
  ChangePass,
  Login,
  Main,
  NewPost,
  PostInfo,
  ProfileEdit,
  ProfileSettings,
  SignUp,
  SignUpComplete,
  TagsPhotos,
} from './pages';
import { selectAccessToken } from './reducers/UserInfoReducer';

const AuthStack = createStackNavigator({
  Login,
  SignUp,
  SignUpComplete,
}, {
  initialRouteName: Pages.LOGIN,
  navigationOptions: {
    header: null,
  },
});

const NewPostStack = createStackNavigator({
  NewPost,
  AddPostInfo,
}, {
  initialRouteName: Pages.NEW_POST,
  navigationOptions: {
    header: null,
  },
});

const BoardsStack = createStackNavigator({
  BoardsPage,
  AddPostToBoard,
}, {
  initialRouteName: Pages.BOARDS_PAGE,
  navigationOptions: {
    header: null,
  },
});

const Inside = createStackNavigator({
  Main,
  NewPostStack,
  AddFriends,
  ProfileEdit,
  ProfileSettings,
  ChangePass,
  BoardsStack,
  PostInfo,
  TagsPhotos,
}, {
  initialRouteName: Pages.MAIN,
  navigationOptions: {
    header: null,
  },
});

class RootStack extends Component {
  render() {
    const { isLoggedIn } = this.props;
    const App = createSwitchNavigator({
      AuthStack,
      Inside,
    }, {
      initialRouteName: isLoggedIn ? Pages.INSIDE : Pages.AUTH_STACK,
      navigationOptions: {
        header: null,
      },
    });
    return (
      <App ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectAccessToken(state) !== '',
});

export default connect(mapStateToProps, null)(RootStack);
