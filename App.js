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


export default class App extends Component {


  componentDidMount() {

    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });


  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

