import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Root, StyleProvider} from 'native-base';
import rootReducer from './src/reducers';
import {Login, SignUp, SignUpComplete, Main, AddPostInfo, NewPost, AddFriends, ProfileEdit, Home} from './src/pages';
import {Actions as SignUpCompleteActions} from './src/pages/signUpComplete/actions';
import {Actions as SignUpActions} from './src/pages/signUp/actions';
import {accessTokenUpdated} from './src/actions/UserInfoActions';
import NavigationService from './src/NavigationService';
import {Pages} from "./src/config";
import ProfileSettings from "./src/pages/profileSettings/ProfileSettings";
import ChangePass from "./src/pages/changePass/ChangePass";
import SelfBoardsPageHeader from "./src/components/SelfBoardsPageHeader";
import commonColor from "./native-base-theme/variables/commonColor";
import getTheme from './native-base-theme/components';

const client = axios.create({
    baseURL: 'http://192.168.11.140', // http://10.0.3.2:8000/
    responseType: 'json'
});

let store = createStore(
    rootReducer,
    {},
    applyMiddleware(
        axiosMiddleware(client, {
            interceptors: {
                request: [
                    function ({getState, dispatch, getSourceAction}, request) {
                        const type = request.reduxSourceAction.type;
                        if (type === SignUpCompleteActions.SIGN_UP || type === SignUpActions.VALIDATE_EMAIL) {
                            return request;
                        }
                        request.headers.authorization = `Bearer ${getState().userInfo.accessToken}`;
                        return request;
                    }
                ],
                response: [
                    {
                        success: function ({getState, dispatch, getSourceAction}, response) {
                            return response;
                        },
                        error: function ({getState, dispatch, getSourceAction}, error) {
                            if (error.status === 401) {
                                return dispatch(accessTokenUpdated(getState.userInfo.refreshToken))
                                    .then(() => {
                                        error.headers.authorization = `Bearer ${getState().userInfo.accessToken}`;
                                        return axios(error.config);
                                    })
                            }
                            throw error;
                        }
                    }
                ]
            },
            returnRejectedPromiseOnError: true
        })
    )
);

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
    SignUpComplete: SignUpComplete,
}, {
    initialRouteName: Pages.LOGIN,
    navigationOptions: {
        header: null,
    }
});

const NewPostStack = createStackNavigator({
    NewPost: NewPost,
    AddPostInfo: AddPostInfo,
}, {
    initialRouteName: Pages.NEW_POST,
    navigationOptions: {
        header: null,
    }
});

const Inside = createStackNavigator({
    Main: Main,
    NewPostStack: NewPostStack,
    AddFriends: AddFriends,
    ProfileEdit: ProfileEdit,
    ProfileSettings: ProfileSettings,
    ChangePass: ChangePass
}, {
    initialRouteName: Pages.MAIN,
    navigationOptions: {
        header: null,
    }
});

const RootStack = createSwitchNavigator({
    AuthStack: AuthStack,
    Inside: Inside,
}, {
    initialRouteName: Pages.AUTH_STACK,
    navigationOptions: {
        header: null,
    }
});

export default class App extends Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <StyleProvider style={getTheme(commonColor)}>
                        <RootStack ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}/>
                    </StyleProvider>
                </Provider>
            </Root>
        );
    }
}