import { View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import VideoPlayer from './VideoPlayer';
import { Text } from '@/components/ui/text';
import CustomHeader from '@/components/ui/CustomHeader';

export default function VideoPlayerPage() {
  const { videoData } = useLocalSearchParams();

  let parsedVideoData;
  try {
    parsedVideoData = JSON.parse(
      Array.isArray(videoData) ? videoData[0] : videoData
    );
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
      {parsedVideoData && <VideoPlayer source={{ uri: parsedVideoData.uri }} />}
    </View>
  );
}
