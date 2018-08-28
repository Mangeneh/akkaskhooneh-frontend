import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {createStackNavigator} from 'react-navigation';
import {Root} from 'native-base'
import rootReducer from './src/reducers'
import Login from './src/pages/login/Login';
import SignUp from './src/pages/signUp/SignUp';
import Profile from './src/pages/profile/Profile';
import ProfileEdit from './src/pages/profileEdit/ProfileEdit';
import ProfileSettings from './src/pages/profileSettings/ProfileSettings';
import NewPost from './src/pages/newPost/NewPost';
import Main from './src/pages/Main';
import SignUpComplete from './src/pages/signUpComplete/SignUpComplete';
import ChangePass from './src/pages/changePass/ChangePass';
import {Actions as SignUpCompleteActions} from "./src/pages/signUpComplete/actions";
import {Actions as SignUpActions} from "./src/pages/signUp/actions";
import NavigationService from './src/NavigationService';

const client = axios.create({
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
                            console.log(error);
                            if (error.status === 401) {
                                // todo
                                return dispatch(refreshToken()) // action to refresh token
                                    .then(() => {
                                        error.headers.authorization = `Bearer ${getState().userInfo.accessToken}`;
                                        return axios(error.config);
                                    })
                            }
                            throw error;
                        }
                    }
                ]
            }
        })
    )
);

const RootStack = createStackNavigator(
    {
        Login: Login,
        SignUp: SignUp,
        SignUpComplete: SignUpComplete,
        Main: Main,
        ProfileEdit: ProfileEdit,
        ProfileSettings: ProfileSettings,
        ChangePass: ChangePass,
        NewPost: NewPost,
    },
    {
        initialRouteName: 'Login'
    });

export default class App extends Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <RootStack
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </Provider>
            </Root>
        );
    }
}