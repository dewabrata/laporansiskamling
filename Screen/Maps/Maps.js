import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid
  } from 'react-native';
class Maps extends Component {

dummyData=[];

constructor(props) {
super(props);
 
 this.state = {
 longitude:0.0,
 latitude:0.0,
 data:[]
 }
 
}   

 onValueChange =()=>  database()
    .ref('/maps/')
    .on('value', snapshot => {
        snapshot.forEach((child) => {
             this.dummyData = [];
            console.log(child.key, child.val()); 
              this.dummyData.push(child.val());
          });
          this.setState({data: this.dummyData});
    });
     
  componentDidMount(props){
  
    this.onValueChange()
    Geolocation.getCurrentPosition(
        info => {
            const { coords } = info

            this.setState({longitude:coords.longitude,latitude:coords.latitude})
           
            
            
            
           
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000
        }
    )
  
  
  }
  
  componentWillUnmount(props){
    database()
    .ref(`/maps/`)
    .off('value', this.onValueChange);
  
  }

    render() {
        return (
            
            
            <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
      
      {this.state.data.map((marker, index) => (
    <Marker
      key={index}
      coordinate={{ latitude : marker.latitude , longitude : marker.longitude }}
      title={marker.email}
     
    />
  ))}
      </MapView>
         
        );
    }
}

export default Maps;