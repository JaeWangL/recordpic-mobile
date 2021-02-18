/**
 * @format
 */
import { AppRegistry, LogBox } from 'react-native';
import App from './app/app';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
]);

AppRegistry.registerComponent(appName, () => App);
