import { useState } from 'react';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { VideoRef } from 'react-native-video';
import { router } from 'expo-router';

import { generateUniqueFileName } from './helpers/helpers';
import { saveOverlays } from '@/core/utils';
import { useVideoActionsProps } from '@/app/(videoPlayer)/videoPlayer/types';
import { VideoActions, ScrubParams } from './types';

export function useVideoActions({
  videoId,
  textOverlays,
}: useVideoActionsProps): VideoActions {
  const [isInTrimProgress, setIsInTrimProgress] = useState<boolean>(false);
  const [trimmedVideoPath, setTrimmedVideoPath] = useState<string | null>(null);
  const [tempTrimmedVideoPath, setTempTrimmedVideoPath] = useState<
    string | null
  >(null);

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

      const command = `-ss ${startSeconds} -i "${source.uri}" -t ${duration} -c copy "${tempOutputPath}"`;

      console.log('Executing FFmpeg command:', command);

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      console.log('FFmpeg process exited with code:', returnCode);

      if (ReturnCode.isSuccess(returnCode)) {
        console.log('Video trimmed successfully');

        setTempTrimmedVideoPath(tempOutputPath);
        setTrimmedVideoPath(finalOutputPath);
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

  const handleSave = async (): Promise<void> => {
    console.log('Saving video effects...', videoId, textOverlays);
    if (videoId && textOverlays.length > 0) {
      saveOverlays(videoId, textOverlays);
    }

    if (trimmedVideoPath && tempTrimmedVideoPath) {
      // Move the file from temp directory to documents directory
      await RNFS.moveFile(tempTrimmedVideoPath, trimmedVideoPath);
      console.log('Trimmed video saved to:', trimmedVideoPath);

      router.replace({
        pathname: '/VideoPlayerPage',
        params: { videoData: JSON.stringify({ uri: trimmedVideoPath }) },
      });
    }
  };

  return {
    handleScrub,
    handleTrim,
    handleSave,
    isInTrimProgress,
  };
}
