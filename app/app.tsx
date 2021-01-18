import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { Loading } from '@/components';
import AppContainer from '@/navigation/app.navigation';
import { persistor, store } from '@/redux';
import { DefaultTheme, ThemeProvider } from '@/styles';

enableScreens();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ThemeProvider theme={DefaultTheme}>
          <AppContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
