/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Register from './Screen/Register/Register'
import {name as appName} from './app.json';



import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application



 import React, { Component } from 'react'
 
  class Main extends Component {
     uiTheme = {
        palette: {
            primaryColor: COLOR.green500,
        },
        toolbar: {
            container: {
                height: 50,
            },
        },
    };
    
     render() {
         return (
          <ThemeContext.Provider value={getTheme(this.uiTheme)}>
            <App />
          </ThemeContext.Provider>
         )
     }
 }
 

AppRegistry.registerComponent(appName, () => Main);
