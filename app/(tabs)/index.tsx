import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SplashScreen } from 'expo-router';
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
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    async function prepare() {
      try {
        // Perform any pre-loading operations here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating some async operation
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <Splash onFinish={() => {}} />;
  }

  const handleFileSelect = (file) => {
    setVideoSource({ uri: file.uri });
  };

  const handleScrub = (time) => {
    // Update video player time
    // You might want to implement this functionality
  };

  const handleAddTextOverlay = () => {
    // Logic to add text overlay
    const newOverlay = { id: Date.now(), text: 'New Overlay', position: { x: 0, y: 0 } };
    setTextOverlays([...textOverlays, newOverlay]);
  };

  const handleTrim = () => {
    // Logic to set trim points
    // You might want to implement this functionality
  };

  const handleSave = () => {
    // Logic to save edited video
    // You might want to implement this functionality
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <UploadVideo onFileSelect={handleFileSelect} />
      {videoSource && (
        <>
          <VideoPlayer 
            source={videoSource} 
            textOverlays={textOverlays} 
            onLoad={(data) => setVideoDuration(data.duration)}
          />
          <Timeline duration={videoDuration} onScrub={handleScrub} />
          <Button title="Add Text Overlay" onPress={handleAddTextOverlay} />
          <Button title="Trim" onPress={handleTrim} />
          <SaveButton onSave={handleSave} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});