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
    Select,
} from 'react-native-clean-form'

import * as ImagePicker from 'react-native-image-picker'

import styles from './style'

const lstLaporan = [
    {label: 'Maling', value: 'maling'},
    {label: 'Kebakaran', value: 'kebakaran'},
    {label: 'Pengrusakan', value: 'pengrusakan'}
  ]

export default class Laporan extends Component {

   constructor(props) {
   super(props)
   
   this.state = {
   uri : ""
   
   }
   
   }
  
     requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
          },
      )


    render() {
        return (
            <Form>
                <FieldsContainer>
                    <Fieldset label="Laporan Kejadian">
                        <FormGroup style={styles.FormGroup}>
                            <Label>Nama Pelapor</Label>
                            <Input placeholder="Nama" onChangeText={this.onFirstNameChange} />
                        </FormGroup>
                        <FormGroup style={styles.FormGroup}>
                            <Label>Email</Label>
                            <Input placeholder="email...@mail.com" onChangeText={this.onEmailChange} />
                        </FormGroup>
                          
                          <FormGroup style={styles.FormGroup}>
                            <Label>Email</Label>
                          <Select
                                      name="lstLaporan"
                                      label="Jenis Laporan"
                                      options={lstLaporan}
                                      placeholder="Laporan"
                             />
                             </FormGroup>
                             
                          <Label>Keterangan</Label>
                          <Input name="message" label="Message" placeholder="" multiline={true} numberOfLines={5}  inlineLabel={false} />
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
                    onPress={
                    this.requestCameraPermission
                    }
                    style={styles.Button}
                />
                <ActionsContainer>
                    <Button title ="Submit" onPress={this.save}>Save</Button>
                </ActionsContainer>
            </Form>
        )
    }
}
