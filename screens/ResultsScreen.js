import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getPredictions } from '../modelInference'; // Importing the getPredictions function
import * as tf from '@tensorflow/tfjs'


export default function App() {
  const [predictions, setPredictions] = useState([]);

  const handleRunModel = async () => {
    try {
      await tf.ready(); // Ensure TensorFlow.js is ready
      const imageURI = tf.randomUniform( [1, 3, 356,356]);; // Generate a random tensor for testing
      const result = await getPredictions(imageURI); // Calling getPredictions function
      if (result) {
        setPredictions(result.map(prediction => prediction.toString())); // Convert predictions to string before setting state
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error running model:', error);
      setPredictions([]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Run Model" onPress={handleRunModel} />
      <Text>Predictions:</Text>
      {predictions.map((prediction, index) => (
        <Text key={index}>{prediction}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

