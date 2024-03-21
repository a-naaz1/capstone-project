import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View , Image, Alert, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import ImageUtils from 'react-native-image-utils';
import { storage } from '../firebase';
import "firebase/storage";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 

import * as MediaLibrary from 'expo-media-library';
import Button from './button';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null); //
  const [image, setImage] = useState(null);
  const [flash, setFlash]=useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef =useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(cameraRef){
      try{
        const data= await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      }catch(e){
        console.log(e);
      }
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = "example.jpg"; // Set a name for your image

    const ref = firebase.storage().ref().child(imageName);
    await ref.put(blob);
    const downloadURL = await ref.getDownloadURL();
    console.log("Image uploaded. Download URL:", downloadURL);
    setUploading(false);
    setImage(null);
  };

  const saveImage = async () => {
    if (image){
      try {
        await uploadImage(image);
        await MediaLibrary.createAssetAsync(image);
        alert('Picture Saved');
      } catch (e) {
        console.error("Error saving image:", e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ?
        <Camera 
          ref={cameraRef}
          style={styles.camera}
          flashMode={flash}
          type={type}
        >
          <View style={styles.cameraButtonsContainer}> 
            <Button 
              icon={'retweet'} 
              onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
              }}
            />
            <Button 
              icon={'flash'} 
              color={flash === Camera.Constants.FlashMode.off ? 'grey' : '#f1f1f1'}
              onPress={() => {
                setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
              }}
            />
          </View>
        </Camera>
        :
        <Image source={{ uri: image }} style={styles.camera} />
      }
      <View>
        {image ?
          <View style={styles.buttonsContainer}>
            <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)} />
            <Button title={"Save"} icon="check" onPress={saveImage} loading={uploading} />
          </View>
          :
          <Button title={'Take a Picture'} icon="camera" onPress={takePicture} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  cameraButtonsContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    padding: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});


