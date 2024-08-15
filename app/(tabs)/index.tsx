import React, { useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useAppReady } from '@/hooks/useAppReady';
import { useVideoState } from '@/hooks/useVideoState';
import { useVideoActions } from '@/hooks/useVideoActions';
import UploadVideo from '../(uploadVideo)/UploadVideo';
import VideoPlayer from '../(videoPlayer)/VideoPlayer';
import Timeline from '../(videoPlayer)/Timeline';
import ActionButton from '../(videoPlayer)/ui/ActionButton';

export default function HomeScreen() {
  const appIsReady = useAppReady();
  const {
    videoSource,
    textOverlays,
    videoDuration,
    handleFileSelect,
    handleAddTextOverlay,
    handleSetVideoDuration,
  } = useVideoState();
  const { handleScrub, handleTrim, handleSave } = useVideoActions();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {!videoSource && <UploadVideo onFileSelect={handleFileSelect} />}
      {videoSource && (
        <>
          <VideoPlayer 
            source={videoSource} 
            textOverlays={textOverlays} 
            onLoad={handleSetVideoDuration}
          />
          <Timeline duration={videoDuration} onScrub={handleScrub} />
          <Button title="Add Text Overlay" onPress={handleAddTextOverlay} />
          <Button title="Trim" onPress={handleTrim} />
          <ActionButton title="Upload Video" onSave={handleSave} />
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