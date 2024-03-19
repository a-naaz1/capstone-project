import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
//import {firebase} from '../firebase'
import { storage } from '../firebase';
import "firebase/storage";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 


const UploadScreen = () => {
  const [image, setImage] = useState(null)
   const [uploading, setUploading] = useState(false) 

   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
}; 

   const uploadImage = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
        var ref = firebase.storage().ref().child(filename).put(blob)
        try {
            await ref;
        } catch (e){
            console.log(e)
        }
        setUploading(false)
        Alert.alert(
            'Photo uploaded!'
        );
        setImage(null);
    } ;
    

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.imageContainer}>
      {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
    </View>
    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
      <Text style={styles.btnText}>Pick an Image</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
      <Text style={styles.btnText}>Upload Image</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
});
export default UploadScreen;
