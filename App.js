import { Root, StyleProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import RootStack from './src/RootStack';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import configureStore from './src/configureStore';

// console.disableYellowBox = true;

const store = configureStore();

export const persistor = persistStore(store);

export default () => (
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
