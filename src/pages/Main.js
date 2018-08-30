import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {Container} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, createMaterialTopTabNavigator} from "react-navigation";
import Home from './home/Home';
import {Colors} from '../config';
import Profile from "./profile/Profile";
import ProfileEdit from "./profileEdit/ProfileEdit";
import ProfileSettings from "./profileSettings/ProfileSettings";

const profileStack = createStackNavigator({
    Profile: Profile,
    ProfileEdit: ProfileEdit,
    ProfileSettings: ProfileSettings,
}, {
    initialRouteName: 'Profile',
    navigationOptions: {
        header: null,
    }
});

profileStack.navigationOptions = ({navigation}) => {
    return {
        tabBarVisible: navigation.state.index === 0
    }
};

const Bottom = createMaterialTopTabNavigator(
    {
        Profile: {screen: profileStack},
        NotificationCenter: {screen: Home},
        Nothing: {screen: Home},
        Search: {screen: Home},
        Home: {screen: Home},
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
                } else if (routeName === 'Search') {
                    iconName = `eye${focused ? '' : '-outline'}`;
                } else if (routeName === 'Home') {
                    iconName = `inbox${focused ? '-multiple' : ''}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} size={24} style={{color: Colors.ICON}}/>;
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
                if (routeName === 'Nothing') {

                } else {
                    argument.defaultHandler();
                }
            },
        }),
        tabBarPosition: 'bottom',
        initialRouteName: 'Profile',
        backBehavior : 'none',
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            showLabel: false,
            showIcon: true,
            tabStyle: {backgroundColor: '#fff', height: 60},
            style: {
                backgroundColor: '#fff',
            }
        }
    });

export default class Main extends React.Component {
    render() {
        return (
            <Container>
                <Bottom/>
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', alignSelf: 'center', bottom: 20}}
                                  onPress={() => this.props.navigation.navigate('NewPost')}>
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