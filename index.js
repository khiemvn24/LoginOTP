/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthenticationScreen} from './src/AuthenticationScreen'
import {InputOTPScreen} from './src/InputOTPScreen'


AppRegistry.registerComponent(appName, () => App);
