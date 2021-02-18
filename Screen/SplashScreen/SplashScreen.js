import React, { Component } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class SplashScreen extends Component {

    componentDidMount(props){
        auth().onAuthStateChanged((userdata)=>{
        
            if (userdata ===null){
           
                this.props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
           
            
            }else{
           
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Dashboard'}],
              });
           
            }
        }
        )}
    render() {
        return (
           <View >
           </View>
        )
    
    }
}
