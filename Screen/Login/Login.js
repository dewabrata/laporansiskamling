import React, { Component } from 'react';
import styles from './style'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state ={
        
        email:"",
        password:"",
    
        
        }
        
        
        }
        
        loginUser = ()=>{
           console.log('Test Register')
           auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((response) => {
            console.log('User account  signed in!');
            console.log("RESPONSE"+response)
            this.props.navigation.navigate("Dashboard")
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          });
           
        
        
        }
      

  goToRegistration = () =>{
    console.log("Test Button")
   this.props.navigation.navigate('Registration')
  }
    render() {
        return (
            <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/ic_launcher.png')} 
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(email) => this.setState({ email : email})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(password) => this.setState({ password : password})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={this.loginUser}
                    style={styles.button}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={this.goToRegistration} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
        );
    }
}

export default Login;