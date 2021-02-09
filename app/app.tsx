import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { CustomLoading } from '@/components';
import AppContainer from '@/navigation/app.navigation';
import { persistor, store } from '@/redux';

enableScreens();

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
