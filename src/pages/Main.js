import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import BottomTabComponent from '../components/BottomTabComponent';
import { Colors, Pages } from '../config';
import ContactList from './contactListPage/ContactListPage';
import Home from './home/Home';
import Notification from './notification/Notification';
import Profile from './profile/Profile';
import Search from './search/Search';
import SearchUserOrTag from './searchUserOrTag/SearchUserOrTag';

const profileStack = createStackNavigator({
  Profile,
  ContactList,
}, {
  initialRouteName: Pages.SELF_PROFILE,
  headerMode: 'none',
});

profileStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
});

const homeStack = createStackNavigator({
  Home,
}, {
  initialRouteName: Pages.HOME,
  headerMode: 'none',
});

homeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
});

const searchStack = createStackNavigator({
  Search,
  SearchUserOrTag,
}, {
  initialRouteName: Pages.SEARCH,
  headerMode: 'none',
});

homeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
});

export default createMaterialTopTabNavigator(
  {
    Home: { screen: homeStack },
    Search: { screen: searchStack },
    Nothing: { screen: Notification },
    NotificationCenter: { screen: Notification },
    Profile: { screen: profileStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `account${focused ? '' : '-outline'}`;
        } else if (routeName === 'NotificationCenter') {
          iconName = `bell${focused ? '' : '-outline'}`;
        } else if (routeName === 'Nothing') {
          return;
        } else if (routeName === 'Search') {
          iconName = `eye${focused ? '' : '-outline'}`;
        } else if (routeName === 'Home') {
          iconName = `inbox${focused ? '-multiple' : ''}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={24} style={{ color: Colors.ICON }} />;
      },
      /**
       * tabBarOnPress
       * Callback to handle press events; the argument is an object containing:
       * navigation: navigation prop for the screen
       * defaultHandler: the default handler for tab press
       * Useful for adding a custom logic before the transition to the next scene (the tapped one) starts.
       */
      tabBarOnPress: (argument) => {
        const { routeName } = navigation.state;
        if (routeName !== 'Nothing') {
          argument.defaultHandler();
        }
      },
    }),
    tabBarComponent: BottomTabComponent,
    lazy: true,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home',
    backBehavior: 'none',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      showLabel: false,
      showIcon: true,
      tabStyle: {
        backgroundColor: '#fff',
        height: 60,
      },
      style: {
        backgroundColor: '#fff',
      },
    },
  },
);
