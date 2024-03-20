import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet ,Text, View , Image} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import ImageUtils from 'react-native-image-utils';

import * as MediaLibrary from 'expo-media-library';
import Button from './button';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null); //
  const [image, setImage] = useState(null);
  const [flash, setFlash]=useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef =useRef(null);
  const [uploading, setUploading] = useState(false) 
 





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

  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = await response.blob()
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
} 

  
// loading the image 
// this we need to options so must include statement that gets the image and 
//assign it
//tldr image must be assigned from gallery or by camera
const loadImage =async ()=> {
  const image = await ImageUtils.fromFile(image);
  
  // getting the image height and width
  
  let imageWidth = image.getWidth();
  let imageHeight = image.getHeight();
  console.log(imageHeight);
  // converting the image to a blob
  const blob = media.toBlob(image);
  
  // from blob converting it to a tensor
  let tensor = torch.fromBlob(blob, [imageHeight, imageWidth, 3]);
  console.log(tensor);
  // Rearrange the tensor shape to be [CHW]
  tensor = tensor.permute([2, 0, 1]);
  
  // Divide the tensor values by 255 to get values between [0, 1]
  tensor = tensor.div(255); //uint8 2^4 0-255 = 2^n -1  log2(256) 8
  
  
  // resize the tensor to [356,356] shape
  const resize = T.resize([356,356]);
  tensor = resize(tensor);
  
  const normalize = T.normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5]);
  tensor = normalize(tensor);
  console.log(tensor);
  // unsqueezing the tensor. The shape now will be [1,244,244]
  const formattedInputTensor = tensor.unsqueeze(0);
  
  
  // running inference
  //we call model here code here might be adjusted based on how the set up for the 
  //model
  // const output = (await model.forward(formattedInputTensor))[0];
  
  // const __, output = (await model.forward(formattedInputTensor))[0];
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
           <Button title={"Save"} icon ="check" onPress={loadImage}/>

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
