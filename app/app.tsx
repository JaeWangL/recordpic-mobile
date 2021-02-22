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
    uri: 'https://smartgeo.blob.core.windows.net/test/background1.png',
  },
  {
    uri: 'https://smartgeo.blob.core.windows.net/test/background2.png',
  },
  {
    uri: 'https://smartgeo.blob.core.windows.net/test/background3.png',
  },
  {
    uri: 'https://smartgeo.blob.core.windows.net/test/thumbnail1.png',
  },
  {
    uri: 'https://smartgeo.blob.core.windows.net/test/thumbnail2.png',
  },
  {
    uri: 'https://smartgeo.blob.core.windows.net/test/thumbnail3.png',
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
