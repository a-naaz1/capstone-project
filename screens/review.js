import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

const ReviewPage = () => {
  const [satisfactionRating, setSatisfactionRating] = useState(3);
  const [heatPainRating, setHeatPainRating] = useState(3);
  const [vibrationPainRating, setVibrationPainRating] = useState(3);
  const [personalFeedback, setPersonalFeedback] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image source={require('./assets/A.png')} style={styles.image} /> */}
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How satisfied were you with the app?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={[styles.ratingButton, satisfactionRating === index + 1 && styles.selectedRatingButton]}
              onPress={() => setSatisfactionRating(index + 1)}
            >
              <Text style={styles.ratingButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How much did the heat help with the pain?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={[styles.ratingButton, heatPainRating === index + 1 && styles.selectedRatingButton]}
              onPress={() => setHeatPainRating(index + 1)}
            >
              <Text style={styles.ratingButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How much did the vibrations help with the pain?</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={[styles.ratingButton, vibrationPainRating === index + 1 && styles.selectedRatingButton]}
              onPress={() => setVibrationPainRating(index + 1)}
            >
              <Text style={styles.ratingButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackQuestion}>Personal Feedback</Text>
        <TextInput
          style={styles.feedbackInput}
          multiline
          value={personalFeedback}
          onChangeText={setPersonalFeedback}
          placeholder="Enter your feedback here..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 100,
  },
  questionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'times-new-roman',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingButton: {
    backgroundColor: '#846D62',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  selectedRatingButton: {
    backgroundColor: '#846D62',
  },
  ratingButtonText: {
    fontSize: 14,
    fontFamily: 'times-new-roman',
    color: 'white',
  },
  feedbackContainer: {
    width: '100%',
  },
  feedbackQuestion: {
    fontSize: 16,
    fontFamily: 'times-new-roman',
    marginBottom: 5,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#846D62',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
});

export default ReviewPage;