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


const UploadScreen = () => {
  const [image, setImage] = useState(null)
   const [uploading, setUploading] = useState(false) 
   const [downloadedURL, setDownloadedURL] = useState(null);
   const [imageUrl, setImageUrl] = useState(null);


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
  setUploading(true);
  try {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const timestamp = Date.now();
      const filename = 'image_' + timestamp + '.jpg'; // Generate filename using concatenation
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

useEffect(() => {
  // Fetch the download URL of the image from Firebase Storage
  const fetchImage = async () => {
      try {
          const storageRef = firebase.storage().ref();
          const timestamp = Date.now();
          const imageRef = storageRef.child('image_' + timestamp + '.jpg'); // Replace 'your_image.jpg' with the actual filename
          const url = await imageRef.getDownloadURL();
          setImageUrl(url);
      } catch (error) {
          console.error('Error fetching image:', error);
      }
  };

  fetchImage(); // Call the fetchImage function when the component mounts
}, []);

    const loadImage =async ()=> {
      const image = imageUrl;
      
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
    <TouchableOpacity style={styles.uploadButton} onPress={loadImage}>
      <Text style={styles.btnText}>load Image</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
}
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
