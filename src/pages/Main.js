import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon, Container} from 'native-base';
import Home from './home/Home';
import {Colors} from '../config';
import Profile from "./profile/Profile";
import {createStackNavigator} from "react-navigation";
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";
import SignUpComplete from "./signUpComplete/SignUpComplete";
import ProfileEdit from "./profileEdit/ProfileEdit";
import ProfileSettings from "./profileSettings/ProfileSettings";
import ChangePass from "./changePass/ChangePass";
import NewPost from "./newPost/NewPost";

const ProfileStack = createStackNavigator(
    {
        Profile: Profile,
        ProfileEdit: ProfileEdit,
        ProfileSettings: ProfileSettings,
        ChangePass: ChangePass,
        NewPost: NewPost,
    },
    {
        initialRouteName: 'Profile'
    }
);

const Bottom = createMaterialBottomTabNavigator(
    {
        ProfileStack: {screen: ProfileStack},
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
        initialRouteName: 'ProfileStack',
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