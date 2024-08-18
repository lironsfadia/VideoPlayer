import { Dimensions } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createThumbnail } from 'react-native-create-thumbnail';
import { VideoRef } from 'react-native-video';

import { getScreenDimensions } from '@/app/(videoPlayer)/timeline/core/utils';
import { useVideoActions } from './useVideoActions';
import { TextOverlayProps, TextOverlayType } from '../textOverlay/types';

const useVideoState = (initialSource: { uri: string }) => {
  const [state, setState] = useState({
    isTrimModalVisible: false,
    currentTime: 0,
    videoLoaded: false,
    thumbnailUri: '',
    videoDimensions: { width: 0, height: 0 },
    duration: 0,
    textOverlays: [] as TextOverlayType[],
    isAddingText: false,
    isPlaying: false,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, updateState] as const;
};

const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState(
    getScreenDimensions()
  );

  useEffect(() => {
    const updateDimensions = () => {
      setScreenDimensions(getScreenDimensions());
    };
    Dimensions.addEventListener('change', updateDimensions);
    return () => {
      // Remove listener if it exists
      // @ts-ignore
      if (Dimensions.removeEventListener) {
        // @ts-ignore
        Dimensions.removeEventListener('change', updateDimensions);
      }
    };
  }, []);

  return screenDimensions;
};

const useThumbnailGenerator = (source: { uri: string }) => {
  const generateThumbnail = useCallback(
    async (time: number) => {
      console.log('Generating thumbnail at time:', time);
      if (source.uri) {
        try {
          const { path } = await createThumbnail({
            url: source.uri,
            timeStamp: time * 1000, // Convert seconds to milliseconds
          });
          console.log('Thumbnail generated:', path);
          return path;
        } catch (err) {
          console.error('Error generating thumbnail:', err);
        }
      } else {
        console.error('No valid source URI provided for thumbnail generation');
      }
    },
    [source.uri]
  );

  return generateThumbnail;
};

export default function useVideoPlayer(source: { uri: string }) {
  const videoRef = useRef<VideoRef>(null);
  const [state, updateState] = useVideoState(source);
  const screenDimensions = useScreenDimensions();
  const generateThumbnail = useThumbnailGenerator(source);

  const {
    handleScrub,
    handleTrim,
    handleSave,
    isInTrimProgress,
    isPendingTrimVersion,
  } = useVideoActions({
    videoId: source.uri,
    textOverlays: state.textOverlays,
  });

  const handlePlayPause = useCallback(() => {
    if (state.isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }
    updateState({ isPlaying: !state.isPlaying });
  }, [state.isPlaying]);

  useEffect(() => {
    console.log('VideoPlayer mounted');
    return () => {
      console.log('VideoPlayer unmounted');
      videoRef.current?.pause();
    };
  }, []);

  const onTrim = useCallback(
    async (start: number, end: number) => {
      await handleTrim(start, end, source, videoRef);
    },
    [handleTrim, source]
  );

  const onProgress = useCallback((data) => {
    updateState({ currentTime: data.currentTime });
  }, []);

  const onBuffer = useCallback((e: Readonly<{ isBuffering: boolean }>) => {
    //console.log('Video buffering:', e.isBuffering);
  }, []);

  const onError = useCallback(
    (e: Readonly<{ error: Readonly<{ code: string; message: string }> }>) => {
      console.error('Video error:', e.error);
    },
    []
  );

  const onLoad = useCallback(
    async (
      data: Readonly<{ duration: number; width: number; height: number }>
    ) => {
      updateState({
        duration: data.duration,
        videoLoaded: true,
        videoDimensions: { width: data.width, height: data.height },
        isPlaying: true,
      });
    },
    []
  );

  const handleFrameUpdate = useCallback(
    async (time: number) => {
      if (videoRef.current) {
        videoRef.current.seek(time);
        const thumbnailUri = await generateThumbnail(time);
        videoRef.current.pause();
        updateState({ isPlaying: false, thumbnailUri });

        setTimeout(() => {
          updateState({ currentTime: time, isPlaying: true });
          videoRef.current?.resume();
        }, 2000);
      }
    },
    [generateThumbnail]
  );

  const handleAddTextOverlay = useCallback(() => {
    videoRef.current?.pause();
    updateState({ isAddingText: true });
  }, []);

  const handleAddNewText = useCallback(
    (text: string, position: { x: number; y: number }) => {
      const newOverlay: TextOverlayType = {
        id: Date.now(),
        text,
        position,
        time: state.currentTime,
      };
      updateState({
        textOverlays: [...state.textOverlays, newOverlay],
        isAddingText: false,
      });
      videoRef.current?.resume();
    },
    [state.currentTime, state.textOverlays]
  );

  const handleCancelAddText = useCallback(() => {
    updateState({ isAddingText: false });
    videoRef.current?.resume();
  }, []);

  const handleUpdateOverlay = useCallback(
    (id: number, text: string, position: { x: number; y: number }) => {
      updateState({
        textOverlays: state.textOverlays.map((overlay) =>
          overlay.id === id ? { ...overlay, text, position } : overlay
        ),
      });
    },
    [state.textOverlays]
  );

  const handleDeleteOverlay = useCallback(
    (id: number) => {
      updateState({
        textOverlays: state.textOverlays.filter((overlay) => overlay.id !== id),
      });
    },
    [state.textOverlays]
  );

  return {
    videoRef,
    handlePlayPause,
    onTrim,
    onProgress,
    onBuffer,
    onError,
    onLoad,
    handleFrameUpdate,
    handleScrub,
    handleAddTextOverlay,
    handleAddNewText,
    handleCancelAddText,
    handleUpdateOverlay,
    handleDeleteOverlay,
    handleSave,
    ...state,
    screenWidth: screenDimensions.width,
    screenHeight: screenDimensions.height,
    setTextOverlays: (overlays: TextOverlayType[]) =>
      updateState({ textOverlays: overlays }),
    setIsTrimModalVisible: (visible: boolean) =>
      updateState({ isTrimModalVisible: visible }),
    isInTrimProgress,
    isPendingTrimVersion,
  };
}
