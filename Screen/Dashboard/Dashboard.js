import React, { Component } from 'react';
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

import styles from './style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



import Geolocation from '@react-native-community/geolocation';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Laporan", image:"https://img.icons8.com/color/70/000000/administrator-male.png"},
        {id:2, title: "History", image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
        {id:3, title: "Map", image:"https://img.icons8.com/dusk/70/000000/globe-earth.png"} ,
        {id:4, title: "Signout", image:"https://img.icons8.com/color/70/000000/shutdown.png"} ,
        
      ],
      counter : 1
    };
  }
  
  componentDidMount(){
     
  }
  
  
  pushPanicButton = () =>{
  
    if(this.state.counter<3){
     let dummyCounter = this.state.counter;
     this.setState({counter: dummyCounter+1})
    }else{
  
    if (this.hasLocationPermission) {
      
      Geolocation.getCurrentPosition(
        info => {
            const { coords } = info

            console.log( coords.latitude)
            console.log( coords.longitude)
            let uniqueId = Date.now()
            database()
                  .ref('/maps/'+uniqueId)
                  .set({
                    email: 'uniqueId',
                    latitude: coords.latitude,
                    longitude:coords.longitude
                    
                  })
                  .then(() => {
                  
                  
                  Alert.alert("Panic Button",`Dilaporkan kejadian di lokasi  ${coords.latitude} , ${coords.longitude}`)
                  this.setState({counter: 1})
                  });
            
            
            
           
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000
        }
    )
    }
      
    }
  
  
  }
  
  clickEventListener =(item) =>{
    Alert.alert(item.title)
    switch(item.title){
    
    case "Map" :
    
       this.props.navigation.navigate("Maps")
    break;
    
    
    }
  }
  
  
  logout = ()=>{
  console.log("SignOut")
    auth()
      .signOut()
      .then(() => {
      console.log('User signed out!')
      this.props.navigation.navigate("Login")
      }).catch((error) => {
        this.props.navigation.navigate("Login")
      
      });
    
  }
    render() {
        return (
          <View style={styles.container}>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.card} onPress={()=>this.clickEventListener(item)}>
                  <View style={styles.cardFooter}></View>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                  <View style={styles.cardHeader}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}/>
             <View style={styles.container2}>
                <TouchableOpacity style={[styles.cardRounded, {backgroundColor:"#FF4500"}]} onPress={this.pushPanicButton} >
                  <Image style={styles.cardImage} source={require('../../assets/warning.png')}/>
                </TouchableOpacity>

                
              </View>
              </View>
        );
    }
    
    hasLocationPermission = async () => {
     
  
      if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
      }
  
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (hasPermission) {
        return true;
      }
  
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
  
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      }
  
      return false;
    };
    
    
}

export default Dashboard;