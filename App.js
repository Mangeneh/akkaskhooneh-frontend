import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './src/reducers'
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import SignUpComplete from "./src/pages/SignUpComplete";
import Profile from './src/pages/Profile'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import BottomNavigationTab from "./src/components/BottomNavigationTab";

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'http://192.168.11.140',
    responseType: 'json'
});

let store = createStore(
    rootReducer,
    {},
    applyMiddleware(
        axiosMiddleware(client) //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
    )
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BottomNavigationTab/>
            </Provider>
        );
    }
}