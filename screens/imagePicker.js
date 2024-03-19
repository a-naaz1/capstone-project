// import React, { useState } from 'react';
// import { Button, Image, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system'
// import {firebase} from './firebase'
// import { storage } from './firebase';
// // //import { ref } from 'firebase/storage'
// // import "firebase/storage";

// // import firebase from '../firebase';
// // import "firebase/compat/storage";

// // //import firebase from 'firebase/app'; 
// // import 'firebase/storage';



// const UploadMediaFile=()=>{

//   const [image, setImage] = useState(null);
//   const [uploading, setUploading]=useState(false);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       quality: 1,
//     });

//     //console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   //upload media files
//   const uploadMedia =async ()=> {
//     setUploading(true);
  
  
//   try {
//     const {uri} =await FileSystem.getInfoAsync(image);
//     const blob =await new Promise ((resolve, reject)=>{
//       const xhr =new XMLHttpRequest ();
//       xhr.onload =() => {
//         resolve(xhr.response);
//       };
//       xhr.onerror =(e) => {
//         reject(new TypeError ('NETWORK REQUEST FAIL'));
//       };
//       xhr.responseType ='blob';
//       xhr.open('GET', uri, true);
//       xhr.send(null);
//     });
//     const filename=image.substring(image.lastIndexOf('/') +1);
//     //const ref = firebase.storage().ref(filename);
//     const ref =firebase.storage().ref().child(filename);

//     await ref.put (blob);
//     setUploading(false);
//     Alert.alert('Photo Uploaded');
//     setImage(null);
//   } catch (error){
//     console.error(error);
//     setUploading(false);

//   }};

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


//       <Button title="Upload Image" onPress={uploadMedia} />
//     </View>
//   )
// }

// export default UploadMediaFile


import React, { useState } from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { storage } from 'firebase/storage';
//import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebase from '../firebase'; // Import your Firebase configuration file

// Initialize Firebase app
//const app = initializeApp(firebase);
//const storage = getStorage(app);

const UploadMediaFile = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    

//   //Function to upload image to Firebase Storage
// const uploadMedia = async () => {
//   if (!image) {
//     console.error('Error uploading image: Image is not selected');
//     Alert.alert('Error', 'Please select an image first.');
//     return;
//   }

//   setUploading(true);

//   try {
//     const fileInfo = await FileSystem.getInfoAsync(image);
//     const fileUri = fileInfo.uri;

//     const response = await fetch(fileUri);
//     const blob = await response.blob();

//     const filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
//     const storageRef = ref(storage, filename);

//     await uploadBytes(storageRef, blob);
    
//     setUploading(false);
//     Alert.alert('Photo Uploaded');
//     setImage(null);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     setUploading(false);
//     Alert.alert('Error', 'Failed to upload photo.');
//   }
// };


const uploadMedia = async () => {
  try {
    if (!image) {
      throw new Error('Image is not selected');
    }

    const fileInfo = await FileSystem.getInfoAsync(image);
    const fileUri = fileInfo.uri; // Define fileUri before using it

    const response = await fetch(fileUri);
    const blob = await response.blob();
    const filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);

    Alert.alert('Photo Uploaded');
    setImage(null);
  } catch (error) {
    console.error('Error uploading image:', error.message);
    Alert.alert('Error', 'Failed to upload photo.');
  }
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button title="Upload Image" onPress={uploadMedia} />
    </View>
  );
};

export default UploadMediaFile;