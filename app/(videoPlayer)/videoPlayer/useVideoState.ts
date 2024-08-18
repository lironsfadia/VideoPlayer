import { router } from 'expo-router';

export function useVideoState() {
  const handleFinishUpload = (file: { uri: string }) => {
    router.push({
      pathname: '/VideoPlayerPage',
      params: { videoData: JSON.stringify(file) },
    });
  };

  return {
    handleFinishUpload,
  };
}
