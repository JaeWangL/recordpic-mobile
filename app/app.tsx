import 'react-native-gesture-handler';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { enableScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { CustomLoading } from '@/components';
import AppContainer from '@/navigation/app.navigation';
import { persistor, store } from '@/redux';

enableScreens();

FastImage.preload([
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
  },
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
  },
]);

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CustomLoading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
