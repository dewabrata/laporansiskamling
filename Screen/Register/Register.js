import React, { Component } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



class Register extends Component {

  constructor(props) {
  super(props);
  
  this.state ={
  name:"",
  email:"",
  password:"",
  repassword:"",
  address :""
  
  }
  
  
  }
  
  registerUser = ()=>{
     console.log('Test Register')
     auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((response) => {
      console.log('User account created & signed in!');
      console.log("RESPONSE"+response)
      
        firestore()
          .collection('users')
          .doc(this.state.email)
          .set({
            name: this.state.name,
            address: this.state.address,
            email: this.state.email
          })
          .then(() => {
            this.props.navigation.navigate("Dashboard")
            console.log('User added!');
          }).catch((error) => {
          Alert.alert("Maaf Gagal Simpan",JSON.stringify(error))
          
          });
      
      
      
      
      
     
      
      
      
      
      
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
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(name) => this.setState({ name : name})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(repassword) => this.setState({ repassword : repassword})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    
                    placeholder='Address'
                    onChangeText={(address) => this.setState({ address : address})}
                    
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.registerUser}
                    >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text  style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
        );
    }
}

export default Register;