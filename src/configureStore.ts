import axios from 'axios';
import { applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { accessTokenUpdated, UsersActions } from './actions';
import Reactotron from './ReactotronConfig';
import rootReducer from './reducers';
import { selectAccessToken, selectRefreshToken } from './reducers/users';

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
              success ({ getState, dispatch, getSourceAction }, request) {
                const { type } = request.reduxSourceAction;
                if (type === UsersActions.SIGN_UP
                  || type === UsersActions.VALIDATE_EMAIL
                  || type === UsersActions.SEND_EMAIL
                  || type === UsersActions.SEND_TOKEN
                  || type === UsersActions.GET_NEW_PASSWORD) {
                  return request;
                }
                request.headers.authorization = `Bearer ${selectAccessToken(getState())}`;
                return request;
              },
            },
          ],
          response: [
            {
              success ({ getState, dispatch, getSourceAction }, response) {
                return response;
              },
              error ({ getState, dispatch, getSourceAction }, error) {
                if (error.response.status === 401) {
                  return dispatch(accessTokenUpdated(selectRefreshToken(getState())))
                    .then(() => {
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
