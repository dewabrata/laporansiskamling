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
    auth().onAuthStateChanged((userdata)=>{
        console.log("user" + JSON.stringify(userdata))
        if (userdata ===null){
        this.setState({isLoggedIn:false})
        }else{
         this.setState({user:userdata,isLoggedIn:true})
        }
    });
   /* firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });*/
      
      


  }
  

    
   
  
  

  render() {
    return (
      
      <NavigationContainer>
         <Stack.Navigator>
         
          { this.state.isLoggedIn ?(
          <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Registration" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Maps" component={Maps} />
           </> ) : (
           <>
          
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Registration" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Maps" component={Maps} />
          
           </>
           
           )}
           
          
         
            
         </Stack.Navigator>
      </NavigationContainer>
    
    )
  }
}

