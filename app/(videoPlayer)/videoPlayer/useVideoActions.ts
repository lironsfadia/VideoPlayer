import { useState, useCallback } from 'react';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS, { moveFile } from 'react-native-fs';
import { VideoRef } from 'react-native-video';
import { router } from 'expo-router';

import { executeTrimCommand, generateUniqueFileName } from './helpers/helpers';
import { useVideoActionsProps, VideoActions, ScrubParams } from './types';
import { saveOverlays } from '../core/utils';

export function useVideoActions({
  videoId,
  textOverlays,
}: useVideoActionsProps): VideoActions {
  const [isInTrimProgress, setIsInTrimProgress] = useState<boolean>(false);
  const [trimmedVideoPath, setTrimmedVideoPath] = useState<string | null>(null);
  const [tempTrimmedVideoPath, setTempTrimmedVideoPath] = useState<
    string | null
  >(null);
  const [isPendingTrimVersion, setIsPendingTrimVersion] =
    useState<boolean>(false);

  const handleScrub = useCallback(({ time, videoRef }: ScrubParams): void => {
    if (videoRef.current) {
      console.log('Scrubbing video to:', time);
      videoRef.current.seek(time);
    }
  }, []);

  const handleTrim = useCallback(
    async (
      startTime: number | string,
      endTime: number | string,
      source: { uri: string },
      videoRef: VideoRef
    ): Promise<void> => {
      console.log('Starting trim operation', startTime, endTime, source);
      setIsInTrimProgress(true);

      try {
        videoRef.current?.pause();

        const documentsDir = RNFS.DocumentDirectoryPath;
        const fileName = await generateUniqueFileName(
          documentsDir,
          'trimmed',
          '.mp4'
        );
        const finalOutputPath = `${documentsDir}/${fileName}`;

        const tempDir = RNFS.TemporaryDirectoryPath;
        const tempFileName = `temp_${Date.now()}.mp4`;
        const tempOutputPath = `${tempDir}/${tempFileName}`;

        const startSeconds =
          typeof startTime === 'string' ? parseFloat(startTime) : startTime;
        const endSeconds =
          typeof endTime === 'string' ? parseFloat(endTime) : endTime;
        const duration = endSeconds - startSeconds;

        const command = `-ss ${startSeconds} -i "${source.uri}" -t ${duration} -c copy "${tempOutputPath}"`;

        console.log('Executing FFmpeg command:', command);

        await executeTrimCommand(command);

        console.log('Video trimmed successfully');

        setTempTrimmedVideoPath(tempOutputPath);
        setTrimmedVideoPath(finalOutputPath);
        setIsPendingTrimVersion(true);
      } catch (error) {
        console.error('Error in trim operation:', error);
        throw error;
      } finally {
        setIsInTrimProgress(false);
      }
    },
    []
  );

  const handleSave = useCallback(async (): Promise<void> => {
    console.log('Saving video effects...', videoId, textOverlays);
    if (videoId && textOverlays.length > 0) {
      await saveOverlays(videoId, textOverlays);
    }

    if (trimmedVideoPath && tempTrimmedVideoPath) {
      try {
        await moveFile(tempTrimmedVideoPath, trimmedVideoPath);
        console.log('Trimmed video saved to:', trimmedVideoPath);

        router.replace({
          pathname: '/VideoPlayerPage',
          params: { videoData: JSON.stringify({ uri: trimmedVideoPath }) },
        });
      } catch (error) {
        console.error('Error saving trimmed video:', error);
        throw error;
      }
    }
  }, [videoId, textOverlays, trimmedVideoPath, tempTrimmedVideoPath]);

  return {
    handleScrub,
    handleTrim,
    handleSave,
    isInTrimProgress,
  };
}
