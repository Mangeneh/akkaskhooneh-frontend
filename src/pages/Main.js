import React from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import BottomTabComponent from '../components/BottomTabComponent';
import { Colors, Pages } from '../config';
import Home from './home/Home';
import Profile from './profile/Profile';
import Search from './search/Search';

const profileStack = createStackNavigator({
  Profile,
}, {
  initialRouteName: Pages.PROFILE,
  navigationOptions: {
    header: null,
  },
  transitionConfig: () => ({
    transitionSpec: {
      easing: Easing.out(Easing.poly(5)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index + 1],
        outputRange: [0, 1, 1],
      });

      return {
        opacity,
        transform: [{ translateY }],
      };
    },
  }),
});

const homeStack = createStackNavigator({
  Home,
}, {
  initialRouteName: Pages.HOME,
  navigationOptions: {
    header: null,
  },
});

homeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
});

export default createMaterialTopTabNavigator(
  {
    Profile: { screen: profileStack },
    NotificationCenter: { screen: Search },
    Nothing: { screen: Search },
    Search: { screen: Search },
    Home: { screen: homeStack },
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
