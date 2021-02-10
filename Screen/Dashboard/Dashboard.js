import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import auth from '@react-native-firebase/auth';

class Dashboard extends Component {

  logout = ()=>{
  console.log("SignOut")
    auth()
      .signOut()
      .then(() => {
      console.log('User signed out!')
      this.props.navigation.navigate("Login")
      });
    
  }
    render() {
        return (
            <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                 <TouchableOpacity
                    style={styles.button}
                    onPress={this.logout}
                    >
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
           </View>
        );
    }
}

export default Dashboard;