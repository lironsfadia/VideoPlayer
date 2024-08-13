import { SplashScreen } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Timeline from './(videoPlayer)/Timeline';
import SaveButton from './(videoPlayer)/ui/ActionButton';
import VideoPlayer from './(videoPlayer)/VideoPlayer';
import UploadVideo from './(uploadVideo)/UploadVideo';
import { Splash } from '@/components/Splash';

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [textOverlays, setTextOverlays] = useState([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

  const onSplashFinish = useCallback(() => {
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <Splash onFinish={onSplashFinish} />;
  }

  const handleFileSelect = (file) => {
    setVideoSource({ uri: file.uri });
  };

  const handleScrub = (time) => {
    // Update video player time
  };

  const handleAddTextOverlay = () => {
    // Logic to add text overlay
  };

  const handleTrim = () => {
    // Logic to set trim points
  };

  const handleSave = () => {
    // Logic to save edited video
  };

  return (
    <View style={styles.container}>
      <UploadVideo onFileSelect={handleFileSelect} />
      {videoSource && (
        <>
          <VideoPlayer source={videoSource} textOverlays={textOverlays} />
          <Timeline duration={videoDuration} onScrub={handleScrub} />
          <Button title="Add Text Overlay" onPress={handleAddTextOverlay} />
          <Button title="Trim" onPress={handleTrim} />
          <SaveButton onSave={handleSave} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
