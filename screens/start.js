import React, {useState} from 'react'
import { Image, Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStack from '../App';

const StartScreen =({navigation})=> {
return (
    <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
    >
    <Text style={styles.titleText}> Skin Lesion Analysis </Text>


    <View style={styles.containerImage}>
    <Image
        style={styles.logo}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/6159/6159086.png'}}
    />
    </View>
    <Text style={styles.optionsText}> Please choose one of the following options: </Text>


    <View style={styles.buttonContainer}>
    <TouchableOpacity
        onPress={()=> navigation.navigate("Login")}
        style={styles.button}
    >
    <Text style={styles.buttonText}> Login </Text>
    </TouchableOpacity>


    <TouchableOpacity
        onPress={()=> navigation.navigate("Register")}
        style={[styles.button, styles.buttonOutline]}
    >
    <Text style={styles.buttonOutlineText}> Register </Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
)
}


export default StartScreen


const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},


titleText:{
    color: 'black',
    fontWeight:'700',
    fontSize: 30,
},


optionsText:{
    color: 'black',
    fontWeight:'400',
    fontSize: 15,    
},


containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:30,
  },


logo: {
    width: 200,
    height: 200,
  },
 
buttonContainer:{
    width: '60%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 15,
},


button:{
    backgroundColor: 'black',
    width: '100%',
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
    fontSize: 16,
},


buttonText:{
    color: 'white',
    fontWeight:'700',
    fontSize: 16,
},
})
