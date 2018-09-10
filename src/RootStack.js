import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Pages } from './config';
import AddFriends from './pages/addFriends/AddFriends';
import AddPostInfo from './pages/addPostInfo/AddPostInfo';
import AddPostToBoard from './pages/addPostToBoard/AddPostToBoard';
import BoardsPage from './pages/boardsPage/BoardsPage';
import ChangePass from './pages/changePass/ChangePass';
import Login from './pages/login/Login';
import Main from './pages/Main';
import NewPost from './pages/newPost/NewPost';
import PostInfo from './pages/postInfo/PostInfo';
import ProfileEdit from './pages/profileEdit/ProfileEdit';
import ProfileSettings from './pages/profileSettings/ProfileSettings';
import SignUp from './pages/signUp/SignUp';
import SignUpComplete from './pages/signUpComplete/SignUpComplete';
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
    return <App />;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectAccessToken(state) !== '',
});

export default connect(mapStateToProps, null)(RootStack);
