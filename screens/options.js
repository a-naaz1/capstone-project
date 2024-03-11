import React, {useState} from 'react'
import { Image, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {Camera} from 'expo-camera'
import Gallery from '../screens/imagePicker';
//import * as Permissions from ;
//import CameraScreen from './screens/camera';





const OptionsScreen =({navigation})=> {
return (
    
    <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
    >
    <View style={styles.buttonContainer}>
   
    <TouchableOpacity
        onPress={()=> navigation.navigate("Camera")}
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}>Take a New Picture  </Text>
    </TouchableOpacity>


    <TouchableOpacity
        onPress={()=> navigation.navigate("Gallery")}
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}>Take Picture from Gallery </Text>
    </TouchableOpacity>


    <TouchableOpacity
        onPress={()=> {}}
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}>View Previous Scans </Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
)
}


export default OptionsScreen


const styles = StyleSheet.create({
buttonContainer:{
    width: '70%',
    height: '30%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 15,
},


button:{
    backgroundColor: 'black',
    width: '100%',
    height:'70%',
    padding:15,
    borderRadius: 10,
},


buttonOutline:{
    backgroundColor:'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth:2,
},


buttonOutlineText:{
    color: 'black',
    fontWeight:'700',
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: "center"
},


buttonText:{
    color: 'white',
    fontWeight:'700',
    fontSize: 16,
   
},


container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
})
