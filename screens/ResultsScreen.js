import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
import * as tf from '@tensorflow/tfjs';

import { storage } from '../firebase';
import "firebase/storage";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 
//import RNFetchBlob from 'rn-fetch-blob';



const FirebaseStorageExample = () => {
    const [imageURL, setImageURL] = useState(null);
  const [tensorData, setTensorData] = useState(null);

  useEffect(() => {
    // Ensure TensorFlow.js is initialized before proceeding
    initializeTensorFlow();
  }, []);

  const initializeTensorFlow = async () => {
    try {
      await tf.ready(); // Wait for TensorFlow.js to be ready
      // Load the image from Firebase Storage when component mounts
      loadFromFirebase();
    } catch (error) {
      console.error('Error initializing TensorFlow:', error);
    }
  };

  const loadFromFirebase = async () => {
    try {
      const storageRef = firebase.storage().ref().child('example.jpg'); // Replace 'image.jpg' with your image's path
      const downloadURL = await storageRef.getDownloadURL();
      setImageURL(downloadURL);

      // Convert image to tensor
      const imageTensor = await imageToTensor(downloadURL);
      setTensorData(imageTensor);
      console.log('Image Tensor Dimensions:', imageTensor.shape);
    } catch (error) {
      console.error('Error loading image from Firebase:', error);
    }
  };

  const imageToTensor = async (uri) => {
    try {
      const { width, height } = await getImageSize(uri);
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(arrayBuffer);
      const imageTensor = tf.browser.fromPixels({ data: imageData, width, height });
      const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [356, 356]);
      const normalizedImageTensor = tf.div(resizedImageTensor, 255.0);
      return normalizedImageTensor;
    } catch (error) {
      console.error('Error converting image to tensor:', error);
      throw error;
    }
  };

  const getImageSize = async (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(uri, (width, height) => {
        resolve({ width, height });
      }, error => {
        reject(error);
      });
    });
  };

  const runModel = () => {
    // Run your machine learning model here using tensorData
    // Example: const result = yourModel.predict(tensorData);
  };
  

  return (
    <View style={styles.container}>
      {imageURL && <Image source={{ uri: imageURL }} style={styles.image} />}
      {tensorData && (
        <Button title="Run Model" onPress={runModel} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});

export default FirebaseStorageExample;