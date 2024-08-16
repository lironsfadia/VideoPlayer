import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { Text } from '@/components/ui/text';
import Timeline from './Timeline';
import ActionButton from './ui/ActionButton';
import { useVideoActions } from '@/hooks/useVideoActions';
import { createThumbnail } from 'react-native-create-thumbnail';
import { getScreenDimensions } from '@/core/utils';
import TextOverlay from './TextOverlay';
import AddTextOverlay from './AddTextOverlay';
import TrimInputModal from './TrimInputModal';

type TextOverlay = {
  id: number;
  text: string;
  time: number;
  position: { x: number; y: number };
};

const VideoPlayer = ({ source }) => {
  const videoRef = useRef<VideoRef>(null);
  const { handleScrub, handleTrim, handleSave } = useVideoActions();
  const { width, height } = getScreenDimensions();
  const [isTrimModalVisible, setIsTrimModalVisible] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [thumbnailUri, setThumbnailUri] = useState('');

  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [screenDimensions, setScreenDimensions] = useState({ width, height });
  const [duration, setDuration] = useState(0);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [isAddingText, setIsAddingText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const onTrim = async (start: number, end: number) => {
    await handleTrim(start, end, source, videoRef);
  };

  useEffect(() => {
    console.log('VideoPlayer mounted');
    const updateDimensions = () => {
      const { width, height } = getScreenDimensions();
      setScreenDimensions({ width, height });
    };
    Dimensions.addEventListener('change', updateDimensions);
    return () => {
      console.log('VideoPlayer unmounted');
    };
  }, []);

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

  function onLoad(data) {
    setDuration(data.duration);
    setVideoLoaded(true);
    setVideoDimensions({ width: data.width, height: data.height });
    generateThumbnail();
    setIsPlaying(true);
  }

  const generateThumbnail = async () => {
    if (!source.uri) {
      try {
        const { path } = await createThumbnail({
          url: source.uri,
          timeStamp: 1000,
        });
        setThumbnailUri(path);
      } catch (err) {
        console.error('Error generating thumbnail:', err);
      }
    }
  };

  const handleFrameUpdate = (time) => {
    if (videoRef.current) {
      videoRef.current.seek(time);

      // Pause the video immediately after seeking
      videoRef.current.pause();

      // Resume playback after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        videoRef.current?.resume();
      }, 1000);
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

  return (
    <SafeAreaView
      style={[styles.container, { width: screenWidth, height: screenHeight }]}
    >
      <View style={styles.videoContainer}>
        {source && (
          <Video
            ref={videoRef}
            source={source}
            style={styles.video}
            onProgress={onProgress}
            resizeMode="cover"
            repeat
            playInBackground={false}
            onBuffer={onBuffer}
            onError={onError}
            onLoad={onLoad}
          />
        )}
        {!videoLoaded && (
          <Text style={styles.loadingText}>Loading video...</Text>
        )}
        {textOverlays.map((overlay) => {
          console.log(overlay.time.toFixed(2), currentTime.toFixed(2));
          return currentTime.toFixed(2) === overlay.time.toFixed(2) ? (
            <TextOverlay
              key={overlay.id}
              id={overlay.id}
              initialText={overlay.text}
              initialPosition={overlay.position}
              onUpdate={handleUpdateOverlay}
              onDelete={handleDeleteOverlay}
            />
          ) : null;
        })}
        {isAddingText && (
          <AddTextOverlay
            onAdd={handleAddNewText}
            onCancel={handleCancelAddText}
          />
        )}
      </View>
      <View style={styles.controlsContainer}>
        <Timeline
          videoRef={videoRef}
          duration={duration}
          onScrub={handleScrub}
          currentTime={currentTime}
          onFrameUpdate={handleFrameUpdate}
          thumbnailUri={thumbnailUri}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Add Text"
            handlePress={handleAddTextOverlay}
            iconName={'text-format'}
          />
          <ActionButton
            title="Trim"
            handlePress={() => setIsTrimModalVisible(true)}
            iconName={'content-cut'}
          />
          <ActionButton
            title="Upload"
            handlePress={handleSave}
            iconName={'save'}
          />
        </View>
        {isTrimModalVisible && (
          <TrimInputModal
            onClose={() => setIsTrimModalVisible(false)}
            onTrim={onTrim}
            duration={duration}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    zIndex: 10,
  },
  controlsContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1, // Ensure controls are above the video
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    zIndex: 2, // Ensure buttons are above other controls
  },
});

export default VideoPlayer;
