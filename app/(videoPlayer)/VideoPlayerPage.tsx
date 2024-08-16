import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from './VideoPlayer';
import { Text } from '@/components/ui/text';
import CustomHeader from '@/components/ui/CustomHeader';

export default function VideoPlayerPage() {
  const { videoData } = useLocalSearchParams();

  useEffect(() => {
    // Lock to landscape orientation when the component mounts
    Orientation.lockToLandscape();

    // Unlock and reset to default orientation when the component unmounts
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait(); // Assuming your app's default is portrait
    };
  }, []);

  let parsedVideoData;
  try {
    parsedVideoData = JSON.parse(videoData);
  } catch (error) {
    console.error('Error parsing video data:', error);
    // Handle the error appropriately, maybe show an error message
    return (
      <View>
        <Text>Error loading video data</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomHeader />
      <VideoPlayer source={{ uri: parsedVideoData.uri }} />
    </View>
  );
}
