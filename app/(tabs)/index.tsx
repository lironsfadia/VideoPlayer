import React, { useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';

import { useAppReady } from '@/hooks/useAppReady';
import { useVideoState } from '@/app/(videoPlayer)/videoPlayer/useVideoState';
import UploadVideo from '../(uploadVideo)/UploadVideo';
import SplashScreen from '../(Splash)/SplashScreen';
import Snow from '../components/ui/Snow';

export default function HomeScreen() {
  const appIsReady = useAppReady();
  const { handleFinishUpload } = useVideoState();

  const onLayoutRootView = useCallback(async () => {
    if (!appIsReady) {
      return <SplashScreen />;
    }
  }, [appIsReady]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-500">
      <Snow />
      <View onLayout={onLayoutRootView}>
        <UploadVideo onFinishUpload={handleFinishUpload} />
      </View>
    </SafeAreaView>
  );
}
