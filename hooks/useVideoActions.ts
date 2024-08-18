import { useState } from 'react';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { VideoRef } from 'react-native-video';
import { VideoActions, ScrubParams } from './types';
import { generateUniqueFileName } from './helpers/helpers';
import { router } from 'expo-router';

export function useVideoActions(): VideoActions {
  const [isInTrimProgress, setIsInTrimProgress] = useState<boolean>(false);

  const handleScrub = ({ time, videoRef }: ScrubParams): void => {
    if (videoRef.current) {
      console.log('Scrubbing video to:', time);
      videoRef.current.seek(time);
    }
  };

  const handleTrim = async (
    startTime: number | string,
    endTime: number | string,
    source: { uri: string },
    videoRef: VideoRef
  ): Promise<void> => {
    console.log('Starting trim operation', startTime, endTime, source);
    setIsInTrimProgress(true);

    try {
      videoRef.current?.pause();

      // Use the Documents directory for the final output
      const documentsDir = RNFS.DocumentDirectoryPath;
      const fileName = await generateUniqueFileName(
        documentsDir,
        'trimmed',
        '.mp4'
      );
      const finalOutputPath = `${documentsDir}/${fileName}`;

      // Use the temporary directory for the initial output
      const tempDir = RNFS.TemporaryDirectoryPath;
      const tempFileName = `temp_${Date.now()}.mp4`;
      const tempOutputPath = `${tempDir}/${tempFileName}`;

      // Convert start and end times to seconds if they're not already
      const startSeconds =
        typeof startTime === 'string' ? parseFloat(startTime) : startTime;
      const endSeconds =
        typeof endTime === 'string' ? parseFloat(endTime) : endTime;

      const duration = endSeconds - startSeconds;

      // Construct FFmpeg command
      const command = `-ss ${startSeconds} -i "${source.uri}" -t ${duration} -c copy "${tempOutputPath}"`;

      console.log('Executing FFmpeg command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      console.log('FFmpeg process exited with code:', returnCode);

      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video trimmed successfully');

        // Move the file from temp directory to documents directory
        await RNFS.moveFile(tempOutputPath, finalOutputPath);
        console.log('Trimmed video saved to:', finalOutputPath);

        // Share the file
        const options = {
          type: 'video/mp4',
          url: `file://${finalOutputPath}`,
          saveToFiles: true,
        };

        router.replace({
          pathname: '/VideoPlayerPage',
          params: { videoData: JSON.stringify({ uri: finalOutputPath }) },
        });
      } else {
        console.error('Error trimming video. Return code:', returnCode);
        const logs = await session.getLogs();
        console.error('FFmpeg logs:', logs);
        throw new Error('Video trimming failed');
      }
    } catch (error) {
      console.error('Error in trim operation:', error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setIsInTrimProgress(false);
    }
  };

  const handleSave = (): void => {
    // Logic to save edited video
    console.log('Saving video');
    // Implementation needed
  };

  return {
    handleScrub,
    handleTrim,
    handleSave,
    isInTrimProgress,
  };
}
