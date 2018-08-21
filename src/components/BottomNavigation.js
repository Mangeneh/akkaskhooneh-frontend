import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon, Container} from 'native-base';
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import {Colors} from "../config/Colors";

const BottomNavigation = createMaterialBottomTabNavigator(
    {
        Profile: {screen: Profile},
        Login: {screen: Login},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `account${focused ? '' : '-outline'}`;
                } else if (routeName === 'Login') {
                    iconName = `bell${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} type={"MaterialCommunityIcons"} size={24} style={{color: Colors.ICON}}/>;
            },
        }),
        labeled: false,
        initialRouteName: 'Profile',
        activeTintColor: '#252384',
        inactiveTintColor: '#ff1a1e',
        barStyle: {backgroundColor: '#fff'},
    });

export default () => (
    <Container>
        <BottomNavigation/>
        <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
            <PlusIcon
                color={'white'}
                name={'plus'}
                raised
                containerStyle={{backgroundColor: Colors.ACCENT}}
                type={"material-community"}
            />
        </TouchableOpacity>
    </Container>
);