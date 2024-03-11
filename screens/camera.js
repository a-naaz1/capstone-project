import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View , Image} from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';
import Button from './button';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null); //
  const [image, setImage] = useState(null);
  const [flash, setFlash]=useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef =useRef(null);
  
  useEffect(() => {
    (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    }) ();
},[])

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
}

const saveImage =async ()=> {
  if (image){
    try {
      await MediaLibrary.createAssetAsync(image);
      alert('Picture Save')
      setImage(null);
}catch(e){
  console.log(e)
}
  }}

if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const Crop_img = () => {
    ImagePicker.openCropper({
      path: data.uri,
      width: dimensions.width - 30,
      height: dimensions.height / 3.5,
      maxFiles: 1,
      showCropFrame: false,
    }).then(data => {
      console.log(data.path);
      Crop_img(data.path);
    });
      };

  return (
   
      <View style={styles.container}>
      {!image ?
            <Camera 
            ref={cameraRef}
            style={styles.camera}
            flashMode={flash}
            type={type}
           >
           <View style={{
            flexDirection:"row",
            justifyContent: 'space-around',
            padding:30
           }}> 

           <Button icon={'retweet'} onPress= {()=> {
            setType (type ===CameraType.back ? CameraType.front:CameraType.back)
           }}/>
           <Button icon={'flash'} 
           color ={flash ===Camera.Constants.FlashMode.off ? 'grey': '#f1f1f1'}
            onPress={()=> {
            setFlash (flash === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.on:
            Camera.Constants.FlashMode.off
            )
           }}/>
           </View>
           </Camera>
           :
           <Image source = {{uri: image}} style ={styles.camera}/>
      }
           <View>
           {image ?
           <View style={{
            flexDirection:"row",
            justifyContent: 'space-around',
            paddingHorizontal:0
           }}
           >
           <Button title={"Re-take"} icon ="retweet" onPress ={ ()=> setImage (null)}/>
           <Button title={"Save"} icon ="check" onPress={saveImage}/>

           </View>
           :
           <Button title={'Take a Picture'} icon= "camera" onPress={takePicture} />
           }
           </View>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'black',
      justifyContent: 'center', 
      paddingBottom: 60,
  },
  camera:{
    flex:1,
    borderRadius:20,
  }
})
