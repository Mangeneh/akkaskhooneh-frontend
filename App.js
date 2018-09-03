import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Root} from 'native-base';
import rootReducer from './src/reducers';
import {Login, SignUp, SignUpComplete, Main, AddPostInfo, NewPost, AddFriends, ProfileEdit, Home} from './src/pages';
import {Actions as SignUpCompleteActions} from './src/pages/signUpComplete/actions';
import {Actions as SignUpActions} from './src/pages/signUp/actions';
import {accessTokenUpdated} from './src/actions/UserInfoActions';

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
    initialRouteName: 'Login',
    navigationOptions: {
        header: null,
    }
});

const NewPostStack = createStackNavigator({
    NewPost: NewPost,
    AddPostInfo: AddPostInfo,
}, {
    initialRouteName: 'NewPost',
    navigationOptions: {
        header: null,
    }
});

const Inside = createStackNavigator({
    Main: Main,
    NewPostStack: NewPostStack,
}, {
    initialRouteName: 'Main',
    navigationOptions: {
        header: null,
    }
});

const RootStack = createSwitchNavigator({
    AuthStack: AuthStack,
    Inside: Inside,
    Home: Home,
}, {
    initialRouteName: 'AuthStack',
    navigationOptions: {
        header: null,
    }
});

export default class App extends Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <NewPostStack />
                </Provider>
            </Root>
        );
    }
}