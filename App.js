/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */




import React, { Component } from 'react'
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Login from './Screen/Login/Login';
import Register from './Screen/Register/Register';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from './Screen/Dashboard/Dashboard';
import auth from '@react-native-firebase/auth';
import Maps from './Screen/Maps/Maps';
import SplashScreen from './Screen/SplashScreen/SplashScreen';


const Stack = createStackNavigator();


export default class App extends Component {

  constructor(props) {
  super(props);
  
  this.state={
    user:null,
    isLoggedIn:false
  
  }
    
    
  
  }
  componentDidMount() {

  }
  
  
   
   
   
   

    
   
  
  

  render() {
    return (
      
      <NavigationContainer>
         <Stack.Navigator>  
            <Stack.Screen name="Splash" component={SplashScreen} />
             <Stack.Screen name="Login" component={Login} />
             <Stack.Screen name="Dashboard" component={Dashboard} />
             <Stack.Screen name="Registration" component={Register} />
             <Stack.Screen name="Maps" component={Maps}/> 
         </Stack.Navigator>
      </NavigationContainer>
    
    )
  }
}

