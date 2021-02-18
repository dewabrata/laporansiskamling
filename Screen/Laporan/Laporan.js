import React, { Component } from 'react'
import {Button,PermissionsAndroid,View,Image} from 'react-native'
import {
    ActionsContainer,
   
    FieldsContainer,
    Fieldset,
    Form,
    FormGroup,
    Input,
    Label,
    Switch,
    Select
    
} from 'react-native-clean-form'

import * as ImagePicker from 'react-native-image-picker'

import styles from './style'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const lstLaporan = [
    {label: 'Maling', value: 'maling'},
    {label: 'Kebakaran', value: 'kebakaran'},
    {label: 'Pengrusakan', value: 'pengrusakan'}
  ]

  const FirebaseStorage = storage();

export default class Laporan extends Component {

   constructor(props) {
   super(props)
   
   this.state ={
    nama:"",
    email:"",
    laporan:"",
    keterangan:"",
    downloadUrl :"",
    uri:"",
    fileImage : null
    
    }
   
   }
  
   requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else { return true; }
  };


  
  
     requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

          ])
           
            
            
            
        
          if (granted === PermissionsAndroid.RESULTS.GRANTED ) {
            console.log("Camera permission given");
            this.captureCamera();
            
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      
      
      captureCamera = () =>
      ImagePicker.launchCamera(
          {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
             
          },
          (response) => {
              console.log(response);
              this.setState({uri: response.uri})
              this.setState({fileImage:response})
              
              
          },
      )
      
      
        submitData = () =>{
            let storageRef = this.createStorageReferences(this.state.fileImage)
            storageRef.putFile(this.state.fileImage.uri).then((res)=>{
               
              
            console.log(JSON.stringify(res))
            
            storageRef.getDownloadURL().then(
            
            (download)=>{
            
            
              firestore()
              .collection('laporan')
              .doc(this.state.email)
              .set({
                nama: this.state.nama,
                email: this.state.email,
                laporan: this.state.laporan,
                keterangan: this.state.keterangan,
                urlDownload: download
                
                
              })
              .then((res) => {
                console.log(JSON.stringify(res))
                console.log('Laporan added!');
              }).catch((error) => {
              Alert.alert("Maaf Gagal Simpan",JSON.stringify(error))
              
              });
            
            
            
            })
            
            
            
            }).catch((err)=>{
              console.log(err)
            })
           
           
        
        }

        createStorageReferences = response =>{
         const {fileName} = response

         return FirebaseStorage.ref(fileName)
        }

    render() {
        return (
            <Form>
                <FieldsContainer>
                    <Fieldset label="Laporan Kejadian">
                        <FormGroup style={styles.FormGroup}>
                            <Label>Nama Pelapor</Label>
                            <Input placeholder="Nama"  onChangeText={(nama) => this.setState({ nama : nama})} />
                        </FormGroup>
                        <FormGroup style={styles.FormGroup}>
                            <Label>Email</Label>
                            <Input placeholder="email...@mail.com" onChangeText={(email) => this.setState({ email : email})} />
                        </FormGroup>
                          
                          <FormGroup style={styles.FormGroup}>
                            <Label>Jenis Laporan</Label>
                          <Select
                                      name="lstLaporan"
                                      label="Jenis Laporan"
                                      options={lstLaporan}
                                      placeholder="Laporan"
                                      onValueChange={(laporan) => this.setState({ laporan : laporan})}
                             />
                             </FormGroup>
                             
                          <Label>Keterangan</Label>
                          <Input name="keterangan" label="Keterangan" placeholder="" multiline={true} numberOfLines={5}  inlineLabel={false}  onChangeText={(keterangan) => this.setState({ keterangan : keterangan})} />
                         </Fieldset>
                         <View style={styles.image}>
                            <Image
                              style={styles.cameraContainer}
                              source={{uri: this.state.uri}}
                            />
                         </View>
                    
                </FieldsContainer>
                <Button
                    title="Take image"
                    onPress={()=>{
                     if(this.requestPermission()){
                     
                     this.captureCamera();
                     
                     }
                    
                    
                    }
                    
                    }
                    
                    style={styles.Button}
                />
                <ActionsContainer>
                    <Button title ="Submit" onPress={this.submitData}>Save</Button>
                </ActionsContainer>
            </Form>
        )
    }
}
