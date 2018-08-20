import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/reducers'
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import SignUpComplete from "./src/pages/SignUpComplete";

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(rootReducer,{}, applyMiddleware(ReduxThunk))}>
                <Login/>
            </Provider>
        );
    }
}