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
  ForgotPassword,
  GetNewPassword,
  Login,
  Main,
  NewPost,
  PostInfo,
  ProfileEdit,
  ProfileSettings,
  SignUp,
  SignUpComplete,
  TagsPhotos,
  TokenPage,
} from './pages';
import ContactList from './pages/contactListPage/ContactListPage';
import Profile from './pages/profile/Profile';
import { selectAccessToken } from './reducers/users';

const AuthStack = createStackNavigator({
  Login,
  SignUp,
  SignUpComplete,
  ForgotPassword,
  TokenPage,
  GetNewPassword,
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

const Inside = createStackNavigator({
  Main,
  NewPostStack,
  AddFriends,
  ProfileEdit,
  ProfileSettings,
  ChangePass,
  BoardsPage,
  AddPostToBoard,
  ContactList,
  PostInfo,
  TagsPhotos,
  OthersProfile: Profile,
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
