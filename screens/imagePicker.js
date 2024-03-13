import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
 import {firebase} from '../firebase'
import { storage } from '../firebase';
// //import { ref } from 'firebase/storage'
// import "firebase/storage";

// import firebase from '../firebase';
// import "firebase/compat/storage";

// //import firebase from 'firebase/app'; 
// import 'firebase/storage';



const UploadMediaFile=()=>{

  const [image, setImage] = useState(null);
  const [uploading, setUploading]=useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //upload media files
  const uploadMedia =async ()=> {
    setUploading(true);
  
  
  try {
    const {uri} =await FileSystem.getInfoAsync(image);
    const blob =await new Promise ((resolve, reject)=>{
      const xhr =new XMLHttpRequest ();
      xhr.onload =() => {
        resolve(xhr.response);
      };
      xhr.onerror =(e) => {
        reject(new TypeError ('NETWORK REQUEST FAIL'));
      };
      xhr.responseType ='blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const filename=image.substring(image.lastIndexOf('/') +1);
    //const ref = firebase.storage().ref(filename);
    const ref =firebase.storage().ref().child(filename);

    await ref.put (blob);
    setUploading(false);
    Alert.alert('Photo Uploaded');
    setImage(null);
  } catch (error){
    console.error(error);
    setUploading(false);

  }};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


      <Button title="Upload Image" onPress={uploadMedia} />
    </View>
  )
}

export default UploadMediaFile
