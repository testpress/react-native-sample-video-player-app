// src/screens/PlayerScreen.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, BackHandler } from 'react-native';
import { NativeModules } from 'react-native';

const { FragmentModule } = NativeModules;

const PlayerScreen = ({ route, navigation }) => {
  const { videoId, accessToken, type } = route.params;

  // Show the custom fragment with the provided videoId and accessToken
  useEffect(() => {
    FragmentModule.showCustomFragment(videoId, accessToken);

    // Handle back button press
    const handleBackPress = () => {
      console.log('Back button pressed!'); // Added console.log
      navigation.goBack();
      FragmentModule.closeCustomFragment();
      return true; // Prevent default back action
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation, videoId, accessToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerContainer}>
        <View style={styles.videoPlaceholder}>
          <Text>16:9 Video Placeholder</Text>
        </View>
        <Text style={styles.title}>{type} Video Player</Text>
        <View style={styles.infoContainer}>
          <Text>Video ID: {videoId}</Text>
          <Text>Access Token: {accessToken}</Text>
          <Text>Video Title: {type === 'DRM' ? 'DRM Video' : 'Non-DRM Video'}</Text>
          <Text>Description: This is a sample video description.</Text>
          <Text>Duration: 10:00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default PlayerScreen;
