import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/reducers'
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import SignUpComplete from "./src/pages/SignUpComplete";
import Profile from './src/pages/Profile'

export default class App extends Component {
    render() {
        return (
<<<<<<< HEAD
            <Provider store={createStore(rootReducer)}>
                <Profile />
=======
            <Provider store={createStore(rootReducer,{}, applyMiddleware(ReduxThunk))}>
                <Login/>
>>>>>>> 7f32b87beccc45c8cba47bc4cb66c15e153c3aa6
            </Provider>
        );
    }
}