import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon} from 'native-base';
import Profile from "../pages/Profile";
import Login from "../pages/Login";

export default createMaterialBottomTabNavigator(
    {
        Profile: {screen: Profile},
        Login: {screen: Login},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={"key"} size={24} style={{color: tintColor}}/>;
            },
        }),
        initialRouteName: 'Profile',
        activeTintColor: '#252384',
        inactiveTintColor: '#ff1a1e',
        barStyle: { backgroundColor: '#fff' },
    });