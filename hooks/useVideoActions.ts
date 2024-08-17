//import { ProcessingManager } from 'react-native-video-processing';
import RNFS from 'react-native-fs';

export function useVideoActions() {
  const handleScrub = ({ time, videoRef }) => {
    if (videoRef.current) {
      console.log('Scrubbing video to:', time);
      videoRef.current.seek(time);
    }
  };

  const handleTrim = async (startTime, endTime, source, videoRef) => {
    console.log('76283');
    try {
      const options = {
        startTime,
        endTime,
        quality: 'medium',
      };

      console.log('1');
      videoRef.current?.pause();
      // const newSource = await ProcessingManager.trim(source, options);

      // console.log('Trimmed video:', newSource);
      // // Ensure the trim was successful
      // if (!newSource) {
      //   throw new Error('Video trimming failed');
      // }

      // // Rename the trimmed video to the original filename
      // await RNFS.moveFile(newSource, source);

      // console.log('Video trimmed and saved successfully');
      // videoRef.current?.save(newSource);
    } catch (error) {
      console.error('Error trimming video:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleSave = () => {
    // Logic to save edited video
    console.log('Saving video');
    // Implementation needed
  };

  return {
    handleScrub,
    handleTrim,
    handleSave,
  };
}
