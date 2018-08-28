import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon, Container} from 'native-base';
import Home from './home/Home';
import {Colors} from '../config';
import Profile from "./profile/Profile";

const Bottom = createMaterialBottomTabNavigator(
    {
        Profile: {screen: Profile},
        X: {screen: Home},
        Nothing: {screen: Home},
        Z: {screen: Home},
        W: {screen: Home},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Profile') {
                    iconName = `account${focused ? '' : '-outline'}`;
                } else if (routeName === 'NotificationCenter') {
                    iconName = `bell${focused ? '' : '-outline'}`;
                } else if (routeName === 'Nothing') {
                    return;
                } else {
                    iconName = `magnify${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} type={'MaterialCommunityIcons'} size={24} style={{color: Colors.ICON}}/>;
            },
            /**
             * tabBarOnPress
             * Callback to handle press events; the argument is an object containing:
             * navigation: navigation prop for the screen
             * defaultHandler: the default handler for tab press
             * Useful for adding a custom logic before the transition to the next scene (the tapped one) starts.
             */
            tabBarOnPress: (argument) => {
                const {routeName} = navigation.state;
                if (routeName === 'Profile') {
                    argument.defaultHandler();
                } else {
                }
            }
        }),
        labeled: false,
        initialRouteName: 'Profile',
        activeTintColor: '#252384',
        inactiveTintColor: '#ff1a1e',
        barStyle: {backgroundColor: '#fff', height: 60},
    });

export default class Main extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Container>
                <Bottom/>
                <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
                    <PlusIcon
                        color={'white'}
                        name={'plus'}
                        raised
                        size={30}
                        containerStyle={{backgroundColor: Colors.ACCENT}}
                        type={'material-community'}
                    />
                </TouchableOpacity>
            </Container>
        );
    }
}