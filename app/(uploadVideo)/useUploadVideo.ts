import { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Link, Stack } from 'expo-router';

interface Video {
  fileCopyUri: null;
  name: string;
  size: number;
  type: string;
  uri: string;
}

const useUploadVideo = (onFinishUpload) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [uploading, setUploading] = useState(false);

  const { width, height } = Dimensions.get('window'); // Get screen dimensions

  const handleUpload = async () => {
    if (!video) {
      console.error('No video selected');
      return;
    }

    setUploading(true);

    try {
      // Define the destination path
      const destPath = `${RNFS.DocumentDirectoryPath}/${video.name}${Date.now()}`;

      // Copy the file to the new location
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
    /* 
    {"fileCopyUri": null, "name": "liron1.mp4", "size": 3130478, "type": "video/mp4", "uri": "file:///private/var/mobile/Containers/Data/Application/9A5DF0FB-804E-4F45-ADB3-25B2271DA597/tmp/liron-Inbox/liron1.mp4"}
    */
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

  return { handleUpload, pickVideo, video, uploading, width, height };
};

export default useUploadVideo;
