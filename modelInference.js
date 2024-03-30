
// predictionModule.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';


const modelJSON = require('./assets/model/model1.json');
const modelWeights = require('./assets/model/weights1.bin');

const loadModel = async () => {
  try {
    const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));
    return model;
  } catch (error) {
    console.log("[LOADING ERROR] info:", error);
    return null;
  }
};

 const transformImageToTensor = async (uri) => {
//    try {
//     const img64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
//     const imgBuffer = tf.util.encodeString(img64, 'base64').buffer;
//     const raw = new Uint8Array(imgBuffer);
//     let imgTensor = decodeJpeg(raw);
//     imgTensor = tf.image.res    izeNearestNeighbor(imgTensor, [300, 300]);
//     const scalar = tf.scalar(255);
//     const tensorScaled = imgTensor.div(scalar);
//     const img = tf.reshape(tensorScaled, [1, 300, 300, 3]);
//     return img;
//   } catch (error) {
//     console.log("[TRANSFORMATION ERROR] info:", error);
//     return null;
//   }

try {
    await tf.ready(); // Ensure TensorFlow.js is ready
    const imageURI = tf.randomUniform( [1, 3, 356,356]); // Generate a random tensor for testing
    return imageURI;
} catch (error) {
        console.log("[TRANSFORMATION ERROR] info:", error);
        return null;
      }
};

const makePredictions = async (batch, model, imagesTensor) => {
  try {
    const predictionsData = model.predict(imagesTensor);
    const pred = predictionsData.split(batch);
    return pred;
  } catch (error) {
    console.log("[PREDICTION ERROR] info:", error);
    return null;
  }
};

export const getPredictions = async (image) => {
  try {
    await tf.ready();
    const model = await loadModel();
    if (!model) {
      console.log("Error: Model not loaded");
      return null;
    }
    const tensorImage = await transformImageToTensor(image);
    if (!tensorImage) {
      console.log("Error: Image transformation failed");
      return null;
    }
    const predictions = await makePredictions(1, model, tensorImage);
    return predictions;
  } catch (error) {
    console.log("[PREDICTION PROCESS ERROR] info:", error);
    return null;
  }
};

