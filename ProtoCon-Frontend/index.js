/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {YellowBox} from 'react-native';
import {name as appName} from './app.json';


YellowBox.ignoreWarnings([
    "Parameter 'url' must be a string"
  ])
  
AppRegistry.registerComponent(appName, () => App);

