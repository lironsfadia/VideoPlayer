import { useEffect, useState } from 'react';
import { TextOverlay } from '../types';
import { router } from 'expo-router';
import Orientation from 'react-native-orientation-locker';

export function useVideoState() {
  const [videoSource, setVideoSource] = useState<{ uri: string } | undefined>(
    undefined
  );

  // useEffect(() => {
  //   // Lock to landscape orientation when the component mounts
  //   Orientation.lockToPortrait();

  //   // Unlock and reset to default orientation when the component unmounts
  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  const handleFinishUpload = (file: { uri: string }) => {
    console.log({ file });
    setVideoSource({ uri: file.uri });
    router.push({
      pathname: '/VideoPlayerPage',
      params: { videoData: JSON.stringify(file) },
    });
  };

  return {
    videoSource,
    handleFinishUpload,
  };
}
