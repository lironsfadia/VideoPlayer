import { useState, useMemo, useCallback } from 'react';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import { useUploadVideoProps, VideoProps } from './types';

const useUploadVideo = ({ onFinishUpload }: useUploadVideoProps) => {
  const [video, setVideo] = useState<VideoProps | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(async () => {
    if (!video) {
      console.error('No video selected');
      return;
    }

    setUploading(true);

    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${video.name}`;
      const fileExists = await RNFS.exists(destPath);
      if (!fileExists) {
        await RNFS.copyFile(video.uri, destPath);
        console.log('Video saved successfully at:', destPath);
      }
      onFinishUpload({ uri: destPath });

      setVideo(null);
    } catch (error) {
      console.error('Error saving video:', error);
    } finally {
      setUploading(false);
    }
  }, [video, onFinishUpload]);

  const onFileSelect = useCallback((file: DocumentPickerResponse) => {
    console.log('Selected file:', file);
    setVideo(file as VideoProps);
  }, []);

  const pickVideo = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      onFileSelect(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error:', err);
      }
    }
  }, [onFileSelect]);

  const videoName = useMemo(() => video?.name, [video]);

  return {
    handleUpload,
    pickVideo,
    video,
    uploading,
    videoName,
  };
};

export default useUploadVideo;
