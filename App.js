/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Root, StyleProvider } from 'native-base';
import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { accessTokenUpdated } from './src/actions/UserInfoActions';
import { Pages } from './src/config';
import NavigationService from './src/NavigationService';
import {
  AddFriends,
  AddPostInfo,
  AddPostToBoard,
  BoardsPage,
  ChangePass,
  Login,
  Main,
  NewPost,
  PostInfo,
  ProfileEdit,
  ProfileSettings,
  SignUp,
  SignUpComplete,
} from './src/pages';
import { Actions as SignUpActions } from './src/pages/signUp/actions';
import { Actions as SignUpCompleteActions } from './src/pages/signUpComplete/actions';
import rootReducer from './src/reducers';
import { selectAccessToken, selectRefreshToken } from './src/reducers/UserInfoReducer';

// console.disableYellowBox = true;

const client = axios.create({
  baseURL: 'http://192.168.11.140',
  // baseURL: 'http://10.0.3.2:8000',
  responseType: 'json',
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(
    axiosMiddleware(client, {
      interceptors: {
        request: [
          {
            success({ getState, dispatch, getSourceAction }, request) {
              const { type } = request.reduxSourceAction;
              if (type === SignUpCompleteActions.SIGN_UP || type === SignUpActions.VALIDATE_EMAIL) {
                return request;
              }
              request.headers.authorization = `Bearer ${getState().userInfo.accessToken}`;
              return request;
            },
          },
        ],
        response: [
          {
            success({ getState, dispatch, getSourceAction }, response) {
              return response;
            },
            error({ getState, dispatch, getSourceAction }, error) {
              if (error.response.status === 401) {
                return dispatch(accessTokenUpdated(selectRefreshToken(getState())))
                  .then(() => {
                    // eslint-disable-next-line no-param-reassign
                    error.config.headers.authorization = `Bearer ${selectAccessToken(getState())}`;
                    return axios(error.config);
                  });
              }
              throw error;
            },
          },
        ],
      },
      returnRejectedPromiseOnError: true,
    }),
  ),
);

export const persistor = persistStore(store);

const AuthStack = createStackNavigator({
  Login,
  SignUp,
  SignUpComplete,
}, {
  initialRouteName: Pages.LOGIN,
  navigationOptions: {
    header: null,
  },
});

const NewPostStack = createStackNavigator({
  NewPost,
  AddPostInfo,
}, {
  initialRouteName: Pages.NEW_POST,
  navigationOptions: {
    header: null,
  },
});

const BoardsStack = createStackNavigator({
  BoardsPage,
  AddPostToBoard,
}, {
  initialRouteName: Pages.BOARDS_PAGE,
  navigationOptions: {
    header: null,
  },
});

const Inside = createStackNavigator({
  Main,
  NewPostStack,
  AddFriends,
  ProfileEdit,
  ProfileSettings,
  ChangePass,
  BoardsStack,
  PostInfo,
}, {
  initialRouteName: Pages.MAIN,
  navigationOptions: {
    header: null,
  },
});

const RootStack = createSwitchNavigator({
  AuthStack,
  Inside,
}, {
  initialRouteName: selectAccessToken(store.getState()) ? Pages.INSIDE : Pages.AUTH_STACK,
  navigationOptions: {
    header: null,
  },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <StyleProvider style={getTheme(commonColor)}>
              <RootStack ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
              />
            </StyleProvider>
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
