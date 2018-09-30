import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { Actions as GetNewPassword } from './pages/getNewPassword/actions';
import { selectAccessToken, selectRefreshToken } from './reducers/users.ts';
import { accessTokenUpdated, UsersActions } from './actions/UsersActions.ts';
import { Actions as ForgotPasswordActions } from './pages/forgotPassword/actions';
import { Actions as SignUpCompleteActions } from './pages/signUpComplete/actions';
import { Actions as SendTokenActions } from './pages/tokenPage/actions';
import rootReducer from './reducers';
import Reactotron from './ReactotronConfig';

export default () => {
  const client = axios.create({
    baseURL: 'https://akkaskhooneh.rasooll.com',
    responseType: 'json',
  });

  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['users'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return Reactotron.createStore(
    persistedReducer,
    {},
    applyMiddleware(
      thunk,
      axiosMiddleware(client, {
        interceptors: {
          request: [
            {
              success({ getState, dispatch, getSourceAction }, request) {
                const { type } = request.reduxSourceAction;
                if (type === SignUpCompleteActions.SIGN_UP
                  || type === UsersActions.VALIDATE_EMAIL
                  || type === ForgotPasswordActions.FORGOT_PASSWORD
                  || type === SendTokenActions.SEND_TOKEN
                  || type === GetNewPassword.CHANGE_PASSWORD) {
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
};
