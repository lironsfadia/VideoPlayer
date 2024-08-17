import { useState } from 'react';
import { Dimensions } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useUploadVideoProps, VideoProps } from './types';
import Video from 'react-native-video';

const useUploadVideo = ({ onFinishUpload }: useUploadVideoProps) => {
  const [video, setVideo] = useState<VideoProps | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!video) {
      console.error('No video selected');
      return;
    }

    setUploading(true);

    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}-${video.name}`;
      await RNFS.copyFile(video.uri, destPath);
      onFinishUpload({ uri: destPath });
      console.log('Video saved successfully at:', destPath);

      // Clear the selected video
      setVideo(null);
    } catch (error) {
      console.error('Error saving video:', error);
    } finally {
      setUploading(false);
    }
  };

  const onFileSelect = (file: DocumentPickerResponse) => {
    console.log('Selected file:', file);

    setVideo(file);
  };

  const pickVideo = async () => {
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
  };

  return {
    handleUpload,
    pickVideo,
    video,
    uploading,
    videoName: video?.name,
  };
};

export default useUploadVideo;
