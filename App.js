import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/reducers'
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import SignUpComplete from "./src/pages/SignUpComplete";

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(rootReducer)}>
<<<<<<< HEAD
                <SignUpComplete />
=======
                <SignUp/>
>>>>>>> 243999540c5ff36f2165acb58d0baf7aa7b2b871
            </Provider>
        );
    }
}