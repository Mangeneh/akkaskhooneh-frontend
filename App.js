/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Root, StyleProvider } from 'native-base';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { selectAccessToken, selectRefreshToken } from './src/reducers/UsersReducer';
import RootStack from './src/RootStack';
import { Actions as GetNewPassword } from './src/pages/getNewPassword/actions';
import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { accessTokenUpdated } from './src/actions/UsersActions';
import { Actions as ForgotPasswordActions } from './src/pages/forgotPassword/actions';
import { Actions as SignUpActions } from './src/pages/signUp/actions';
import { Actions as SignUpCompleteActions } from './src/pages/signUpComplete/actions';
import { Actions as SendTokenActions } from './src/pages/tokenPage/actions';
import rootReducer from './src/reducers';

// console.disableYellowBox = true;

const client = axios.create({
  baseURL: 'http://192.168.11.140',
  responseType: 'json',
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['users'],
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
              if (type === SignUpCompleteActions.SIGN_UP || type === SignUpActions.VALIDATE_EMAIL || type === ForgotPasswordActions.FORGOT_PASSWORD || type === SendTokenActions.SEND_TOKEN || type === GetNewPassword.CHANGE_PASSWORD) {
                return request;
              }
              request.headers.authorization = `Bearer ${selectAccessToken(getState())}`;
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <StyleProvider style={getTheme(commonColor)}>
              <RootStack />
            </StyleProvider>
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
