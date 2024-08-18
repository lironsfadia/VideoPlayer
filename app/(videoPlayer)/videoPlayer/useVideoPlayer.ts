import { Dimensions } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createThumbnail } from 'react-native-create-thumbnail';
import { VideoRef } from 'react-native-video';

import { getScreenDimensions } from '@/core/utils';
import { useVideoActions } from './useVideoActions';
import { TextOverlay } from './types';

export default function useVideoPlayer(source) {
  const videoRef = useRef<VideoRef>(null);
  const [isTrimModalVisible, setIsTrimModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = getScreenDimensions();
  const [screenDimensions, setScreenDimensions] = useState({ width, height });
  const [duration, setDuration] = useState(0);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [isAddingText, setIsAddingText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { handleScrub, handleTrim, handleSave, isInTrimProgress } =
    useVideoActions({ videoId: source.uri, textOverlays: textOverlays });

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    console.log('VideoPlayer mounted');
    const updateDimensions = () => {
      const { width, height } = getScreenDimensions();
      setScreenDimensions({ width, height });
    };
    Dimensions.addEventListener('change', updateDimensions);
    return () => {
      console.log('VideoPlayer unmounted');
      videoRef.current?.pause();
    };
  }, []);

  const onTrim = async (start: number, end: number) => {
    await handleTrim(start, end, source, videoRef);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  function onBuffer(e: Readonly<{ isBuffering: boolean }>): void {
    //console.log('Video buffering:', e.isBuffering);
  }

  function onError(
    e: Readonly<{ error: Readonly<{ code: string; message: string }> }>
  ): void {
    console.error('Video error:', e.error);
  }

  async function onLoad(
    data: Readonly<{ duration: number; width: number; height: number }>
  ): Promise<void> {
    setDuration(data.duration);
    setVideoLoaded(true);
    setVideoDimensions({ width: data.width, height: data.height });
    setIsPlaying(true);
  }

  const generateThumbnail = async (time: number) => {
    console.log('Generating thumbnail at time:', time);
    if (source.uri) {
      try {
        const { path } = await createThumbnail({
          url: source.uri,
          timeStamp: time * 1000, // Convert seconds to milliseconds
        });
        console.log('Thumbnail generated:', path);
        setThumbnailUri(path);
      } catch (err) {
        console.error('Error generating thumbnail:', err);
      }
    } else {
      console.error('No valid source URI provided for thumbnail generation');
    }
  };

  const handleFrameUpdate = async (time: number) => {
    if (videoRef.current) {
      videoRef.current.seek(time);
      generateThumbnail(time);
      // Pause the video immediately after seeking
      videoRef.current.pause();
      setIsPlaying(false);

      // Resume playback after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        setCurrentTime(time);
        videoRef.current?.resume();
        setIsPlaying(true);
      }, 2000);
    }
  };

  const handleAddTextOverlay = () => {
    videoRef.current?.pause();
    setIsAddingText(true);
  };

  const handleAddNewText = (
    text: string,
    position: { x: number; y: number }
  ) => {
    const newOverlay: TextOverlay = {
      id: Date.now(),
      text,
      position,
      time: currentTime,
    };
    setTextOverlays([...textOverlays, newOverlay]);
    setIsAddingText(false);
    videoRef.current?.resume();
  };

  const handleCancelAddText = () => {
    setIsAddingText(false);
    videoRef.current?.resume();
  };

  const handleUpdateOverlay = (
    id: number,
    text: string,
    position: { x: number; y: number }
  ) => {
    setTextOverlays((overlays) =>
      overlays.map((overlay) =>
        overlay.id === id ? { ...overlay, text, position } : overlay
      )
    );
  };

  const handleDeleteOverlay = (id: number) => {
    setTextOverlays((overlays) =>
      overlays.filter((overlay) => overlay.id !== id)
    );
  };

  const { width: screenWidth, height: screenHeight } = screenDimensions;

  return {
    videoRef,
    handlePlayPause,
    onTrim,
    onProgress,
    onBuffer,
    onError,
    onLoad,
    currentTime,
    videoLoaded,
    thumbnailUri,
    videoDimensions,
    duration,
    textOverlays,
    isAddingText,
    handleAddTextOverlay,
    handleAddNewText,
    handleCancelAddText,
    handleUpdateOverlay,
    handleDeleteOverlay,
    handleFrameUpdate,
    handleScrub,
    screenWidth,
    screenHeight,
    isTrimModalVisible,
    setIsTrimModalVisible,
    handleSave,
    isPlaying,
    setTextOverlays,
    isInTrimProgress,
  };
}
