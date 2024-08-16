import React, { useCallback } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useAppReady } from '@/hooks/useAppReady';
import { useVideoState } from '@/hooks/useVideoState';
import { useVideoActions } from '@/hooks/useVideoActions';
import UploadVideo from '../(uploadVideo)/UploadVideo';
import VideoPlayer from '../(videoPlayer)/VideoPlayer';
import Timeline from '../(videoPlayer)/Timeline';
import ActionButton from '../(videoPlayer)/ui/ActionButton';
import WordSlotMachine from '../WordsSlotMachine';

export default function HomeScreen() {
  const appIsReady = useAppReady();
  const {
    videoSource,
    textOverlays,
    handleFinishUpload,
    handleAddTextOverlay,
  } = useVideoState();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <WordSlotMachine />;
  }

  console.log('videoSource', videoSource);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {!videoSource && <UploadVideo onFinishUpload={handleFinishUpload} />}
        {/* {videoSource && (
          <View style={{ flex: 1 }}>
            <VideoPlayer
              source={videoSource}
              textOverlays={textOverlays}
              handleAddTextOverlay={handleAddTextOverlay}
            />
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
