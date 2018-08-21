import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {createStackNavigator} from 'react-navigation';
import rootReducer from './src/reducers'
import Login from "./src/pages/login/Login";
import SignUp from "./src/pages/signUp/SignUp";
import Profile from './src/pages/profile/Profile'
import BottomNavigation from './src/components/BottomNavigation';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'http://192.168.11.140',
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
                        request.headers.authorization = `Bearer ${getState().userInfo.token}`;
                        console.warn(`${JSON.stringify(request)}   Hi`); //contains information about request object
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
                                // return getNewToken().then(() => dispatch(getSourceAction()))
                            }
                            return error;
                        }
                    }]
            }
        }) //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
    )
);

const RootStack = createStackNavigator(
    {
        Login: Login,
        Profile: Profile,
        SignUp: SignUp
    },
    {
        initialRouteName: 'Login'
    });

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
        );
    }
}