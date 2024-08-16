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

const VideoPlayer = ({ source, textOverlays, handleAddTextOverlay }) => {
  const { handleScrub, handleTrim, handleSave } = useVideoActions();
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window')
  );

  useEffect(() => {
    console.log('VideoPlayer mounted');
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenDimensions({ width, height });
    };
    Dimensions.addEventListener('change', updateDimensions);
    return () => {
      console.log('VideoPlayer unmounted');
    };
  }, []);

  const onProgress = (data) => {
    console.log('Video progress:', data);
    setCurrentTime(data.currentTime);
  };

  function onBuffer(e: Readonly<{ isBuffering: boolean }>): void {
    console.log('Video buffering:', e.isBuffering);
  }

  function onError(
    e: Readonly<{ error: Readonly<{ code: string; message: string }> }>
  ): void {
    console.error('Video error:', e.error);
  }

  function onLoad(data) {
    console.log('Video loaded:', data);
    setVideoLoaded(true);
    setVideoDimensions({ width: data.width, height: data.height });
  }

  const { width: screenWidth, height: screenHeight } = screenDimensions;

  return (
    <SafeAreaView
      style={[styles.container, { width: screenWidth, height: screenHeight }]}
    >
      <View style={styles.videoContainer}>
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
        {!videoLoaded && (
          <RNText style={styles.loadingText}>Loading video...</RNText>
        )}
        {textOverlays.map(
          (overlay, index) =>
            overlay.timestamp <= currentTime && (
              <View
                key={index}
                style={[
                  styles.overlay,
                  {
                    top: (overlay.y / 100) * screenHeight,
                    left: (overlay.x / 100) * screenWidth,
                  },
                ]}
              >
                <Text style={styles.overlayText}>{overlay.text}</Text>
              </View>
            )
        )}
      </View>
      <View style={styles.controlsContainer}>
        <Timeline duration={source.duration} onScrub={handleScrub} />
        <View style={styles.buttonContainer}>
          <ActionButton title="Add Text" handlePress={handleAddTextOverlay} />
          <ActionButton title="Trim" handlePress={handleTrim} />
          <ActionButton title="Upload" handlePress={handleSave} />
        </View>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default VideoPlayer;
