import React, { useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { router, SplashScreen, Stack } from 'expo-router';
import { useAppReady } from '@/hooks/useAppReady';
import { useVideoState } from '@/hooks/useVideoState';
import { useVideoActions } from '@/hooks/useVideoActions';
import UploadVideo from '../(uploadVideo)/UploadVideo';
import VideoPlayer from '../(videoPlayer)/VideoPlayer';
import Timeline from '../(videoPlayer)/Timeline';
import ActionButton from '../(videoPlayer)/ui/ActionButton';
import WordSlotMachine from '../(Splash)/WordsSlotMachine';
import { Button } from '@/components/ui/button';
import CustomHeader from '@/components/ui/CustomHeader';

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
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-500">
      <View onLayout={onLayoutRootView}>
        <UploadVideo onFinishUpload={handleFinishUpload} />
      </View>
    </SafeAreaView>
  );
}
