import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/reducers'
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import SignUpComplete from "./src/pages/SignUpComplete";
import Profile from './src/pages/Profile'

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(rootReducer)}>
                <Profile />
            </Provider>
        );
    }
}