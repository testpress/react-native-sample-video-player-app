import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Button, DeviceEventEmitter } from 'react-native';
import { NativeModules } from 'react-native';

const { FragmentModule } = NativeModules;

const DownloadListScreen = ({ navigation }) => {
  // Initialize downloads state as an empty array
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    // Start observing download data from native side
    FragmentModule.observeDownloadData();

    // Set up the event listener for "onDownloadDataChanged"
    const subscription = DeviceEventEmitter.addListener(
      'onDownloadDataChanged',
      (event) => {
        console.log('Download data updated:', event.assets);
        // Update the download list with new data from the event
        setDownloads(event.assets); // Assuming event.assets contains updated download data
      }
    );

    // Cleanup the listener when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []); // Empty dependency array means this effect runs once when the component is mounted

  // Handle pause download
  const handlePause = (videoId) => {
    console.log(`Pause download for item with id: ${videoId}`);
    FragmentModule.pauseDownload(videoId)
  };

  // Handle cancel download
  const handleCancel = (videoId) => {
    console.log(`Cancel download for item with id: ${videoId}`);
    FragmentModule.cancelDownload(videoId)
  };

  // Handle delete item
  const handleDelete = (videoId) => {
    console.log(`Delete item with id: ${videoId}`);
    FragmentModule.deleteDownload(videoId)
  };

  // Handle resume download
  const handleResume = (videoId) => {
    console.log(`Resume download for item with id: ${videoId}`);
    FragmentModule.resumeDownload(videoId)
  };

  // Handle play video and navigate to PlayerScreen
  const handlePlay = (videoId) => {
    console.log(`Play video for item with id: ${videoId}`);
    // Navigate to PlayerScreen and pass videoId and accessToken
    navigation.navigate('PlayerScreen', { videoId , accessToken: 'OfflineVideo', type: 'DRM' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemTitle}>{item.title}</Text>
      <Text style={styles.listItemDetails}>Duration: {item.duration}</Text>
      <Text style={styles.listItemDetails}>Download: {item.percentage}%</Text>
      <Text style={styles.listItemDetails}>Status: {item.status}</Text>
      <View style={styles.actionButtons}>
        {item.status === 'DOWNLOADING' && (
          <>
            <Button title="Pause" onPress={() => handlePause(item.videoId)} />
            <Button title="Cancel" onPress={() => handleCancel(item.videoId)} />
          </>
        )}
        {item.status === 'COMPLETE' && (
          <>
            <Button title="Play" onPress={() => handlePlay(item.videoId)} />
            <Button title="Delete" onPress={() => handleDelete(item.videoId)} />
          </>
        )}
        {item.status === 'PAUSE' && (
          <>
            <Button title="Resume" onPress={() => handleResume(item.videoId)} />
            <Button title="Cancel" onPress={() => handleCancel(item.videoId)} />
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Download List</Text>
      <FlatList
        data={downloads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDetails: {
    fontSize: 16,
    marginVertical: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default DownloadListScreen;
