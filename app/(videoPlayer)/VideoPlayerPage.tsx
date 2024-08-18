import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { Text } from '@/components/ui/text';
import CustomHeader from '@/components/ui/CustomHeader';

import VideoPlayer from './videoPlayer/VideoPlayer';

export default function VideoPlayerPage() {
  const { videoData } = useLocalSearchParams();
  let parsedVideoData;
  try {
    parsedVideoData = JSON.parse(
      Array.isArray(videoData) ? videoData[0] : videoData
    );
  } catch (error) {
    console.error('Error parsing video data:', error);
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Error loading video data</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <CustomHeader />
        {parsedVideoData && (
          <VideoPlayer source={{ uri: parsedVideoData.uri }} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
