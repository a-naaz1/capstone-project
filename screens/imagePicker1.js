import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
//import {firebase} from '../firebase'
import { storage } from '../firebase';
import "firebase/storage";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 
import ImageUtils from 'react-native-image-utils';
//import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';



//import {torch, torchvision, media} from 'react-native-pytorch-core';


const UploadScreen = ({navigation}) =>{
  const [image, setImage] = useState(null)
   const [uploading, setUploading] = useState(false) 
   const [downloadedURL, setDownloadedURL] = useState(null);
   const [imageUrl, setImageUrl] = useState(null);
    const [imageWidth, setImageWidth] = useState(null); // State variable to store image width

  


   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4,3],
        quality: 1
    });
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
}; 




const uploadImage = async () => {
  setUploading(true);
  try {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let yu = Math.floor(Math.random() * 100);
      const characters_len = characters.length;
      let yuy = characters.charAt(Math.floor(Math.random() * characters_len));
      yuy += characters.charAt(Math.floor(Math.random() * characters_len));
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = 'image_' + yuy + yu.toString() + '.jpg'; // Generate filename using concatenation
      
      const ref = firebase.storage().ref().child(filename).put(blob);
      await ref;
      setUploading(false);
      Alert.alert('Photo uploaded!');
      setImage(null);
  } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert('Error uploading photo. Please try again.');
  }
};


    const loadImage =async ()=> {
      const image = imageUrl;
      try {
        const { width, height } = await new Promise((resolve, reject) => {
          Image.getSize(image, (width, height) => {
            resolve({ width, height });
          }, error => reject(error));
        });
        console.log("Image width:", width);
        console.log("Image height:", height);
        // You can use width and height here as needed
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }

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
    <TouchableOpacity style={styles.resultsButton} onPress={()=> navigation.navigate("Analysis")}>
      <Text style={styles.btnText}>See Results</Text>
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

  resultsButton: {
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
    marginTop: 10,
    marginBottom: 5,
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
