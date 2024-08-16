import { useEffect, useState } from 'react';
import { TextOverlay } from '../types';
import { router } from 'expo-router';
import Orientation from 'react-native-orientation-locker';

export function useVideoState() {
  const [videoSource, setVideoSource] = useState<{ uri: string } | undefined>(
    undefined
  );
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

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

  const handleAddTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: Date.now(),
      text: 'New Overlay',
      position: { x: 0, y: 0 },
    };
    setTextOverlays([...textOverlays, newOverlay]);
  };

  return {
    videoSource,
    textOverlays,
    trimStart,
    trimEnd,
    handleFinishUpload,
    handleAddTextOverlay,
    setTrimStart,
    setTrimEnd,
  };
}
