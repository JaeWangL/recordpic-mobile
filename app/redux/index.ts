import AsyncStorage from '@react-native-community/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducers';
import rootSagas from './rootSagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const devMode = false; // __DEV__;
const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (devMode) {
  middleware.push(createLogger());
}

const reducers = persistReducer(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig: any = { enhancers };

const storeConfig = () => {
  const store = createStore(reducers, undefined, compose(...enhancers));
  const persistor = persistStore(store, persistConfig);

  sagaMiddleware.run(rootSagas);

  return { persistor, store };
};

export const { persistor, store } = storeConfig();
