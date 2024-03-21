import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
//import firebase from 'firebase/app';
import 'firebase/storage';
import { storage } from '../firebase';
import "firebase/storage";
import "firebase/compat/storage";
import firebase from 'firebase/compat/app'; // Import the compat version of firebase
import 'firebase/compat/storage'; 
import ImageUtils from 'react-native-image-utils';


const GalleryScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from Firebase Storage when component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const storageRef = firebase.storage().ref().child('images');
    const imageList = await storageRef.listAll();

    // Get download URLs for each image
    const urls = await Promise.all(
      imageList.items.map(async (imageRef) => {
        return await imageRef.getDownloadURL();
      })
    );

    // Set the URLs to state
    setImages(urls);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
  },
});

export default GalleryScreen;


