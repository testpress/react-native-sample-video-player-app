// src/screens/MainScreen.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Play DRM Video"
          onPress={() =>
            navigation.navigate('PlayerScreen', { videoId: 'CY9MBTRBIDs', accessToken: 'ad1b7e44-78b7-4bc6-86cf-19554a160421', type: 'DRM' })
          }
        />
        <Button
          title="Play Non-DRM Video"
          onPress={() =>
            navigation.navigate('PlayerScreen', { videoId: 'ATJfRdHIUC9', accessToken: 'a4c04ca8-9c0e-4c9c-a889-bd3bf8ea586a', type: 'NON-DRM' })
          }
        />
        <Button
          title="Download List"
          onPress={() => navigation.navigate('DownloadListScreen')}
        />
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default MainScreen;
