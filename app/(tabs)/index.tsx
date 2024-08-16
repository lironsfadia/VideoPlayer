import React, { useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useAppReady } from '@/hooks/useAppReady';
import { useVideoState } from '@/hooks/useVideoState';
import UploadVideo from '../(uploadVideo)/UploadVideo';
import WordSlotMachine from '../(Splash)/WordsSlotMachine';

export default function HomeScreen() {
  const appIsReady = useAppReady();
  const { videoSource, textOverlays, handleFinishUpload } = useVideoState();

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
