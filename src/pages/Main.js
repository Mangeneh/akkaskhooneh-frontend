import React from 'react';
import {TouchableOpacity, Animated, Easing} from 'react-native';
import {Icon as PlusIcon} from 'react-native-elements';
import {Container} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import Home from './home/Home';
import Search from './search/Search';
import {Colors, Pages} from '../config';
import Profile from './profile/Profile';

const profileStack = createStackNavigator({
    Profile: Profile,
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
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index + 1],
                outputRange: [0, 1, 1],
            });

            return {opacity, transform: [{translateY}]};
        },
    }),
});

const homeStack = createStackNavigator({
    Home: Home,
}, {
    initialRouteName: Pages.HOME,
    navigationOptions: {
        header: null,
    },
});

homeStack.navigationOptions = ({navigation}) => {
    return {
        tabBarVisible: navigation.state.index === 0
    }
};

const Bottom = createMaterialTopTabNavigator(
    {
        Profile: {screen: profileStack},
        NotificationCenter: {screen: Search},
        Nothing: {screen: Home},
        Search: {screen: Search},
        Home: {screen: homeStack},
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
                if (routeName !== 'Nothing') {
                    argument.defaultHandler();
                }
            },
        }),
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        backBehavior: 'none',
        swipeEnabled: false,
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