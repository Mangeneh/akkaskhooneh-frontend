import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon, Container} from 'native-base';
import Profile from "./profile/Profile";
import Login from "./login/Login";
import {Colors} from "../config/Colors";
import SelfProfileInfo from "../components/SelfProfileInfo";

const Main = createMaterialBottomTabNavigator(
    {
        Profile: {screen: SelfProfileInfo},
        Login: {screen: Login},
        X: {screen: Login},
        Profile2: {screen: Profile},
        Login2: {screen: Login},
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
                } else {
                    iconName = `bell${focused ? '' : '-outline'}`;
                }
                if (routeName === 'X') {
                    return (
                        <View onPress={() => {
                        }}/>
                    );
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} type={"MaterialCommunityIcons"} size={24} style={{color: Colors.ICON}}/>;
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
                if (routeName === 'X') {
                } else {
                    argument.defaultHandler();
                }
            }
        }),
        labeled: false,
        initialRouteName: 'Profile',
        activeTintColor: '#252384',
        inactiveTintColor: '#ff1a1e',
        barStyle: {backgroundColor: '#fff', height: 60},
    });

export default () => (
    <Container>
        <Main/>
        <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', bottom: 20}}>
            <PlusIcon
                color={'white'}
                name={'plus'}
                raised
                size={30}
                containerStyle={{backgroundColor: Colors.ACCENT}}
                type={"material-community"}
            />
        </TouchableOpacity>
    </Container>
);