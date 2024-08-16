import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Thumbnail from './Thumbnail';
import { MaterialIcons } from '@expo/vector-icons';

const Timeline = ({
  duration,
  currentTime,
  onScrub,
  videoRef,
  onFrameUpdate,
  thumbnailUri,
  onPlayPause,
  isPlaying,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const timelineWidth = Dimensions.get('window').width - 100; // Adjust for padding and play button
  const durationRef = useRef(duration);
  const positionRef = useRef(0);
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    durationRef.current = duration;
    setDebugInfo(`Duration: ${duration}, CurrentTime: ${currentTime}`);

    if (!isDragging && duration > 0) {
      const newPosition = (currentTime / duration) * timelineWidth;
      positionRef.current = isNaN(newPosition)
        ? 0
        : Math.max(0, Math.min(newPosition, timelineWidth));
    }

    // Start the glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [currentTime, duration, isDragging, timelineWidth]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        const newPosition = Math.max(
          0,
          Math.min(gestureState.moveX - 50, timelineWidth) // Adjust for play button width
        );
        positionRef.current = newPosition;
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        const currentDuration = durationRef.current;
        if (currentDuration > 0) {
          const time = (positionRef.current / timelineWidth) * currentDuration;
          onScrub({ videoRef: videoRef, time: isNaN(time) ? 0 : time });
          onFrameUpdate(isNaN(time) ? 0 : time);
        }
      },
    })
  ).current;

  const safePosition = useMemo(
    () =>
      isNaN(positionRef.current)
        ? 0
        : Math.max(0, Math.min(positionRef.current, timelineWidth)),
    [positionRef.current, timelineWidth]
  );

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const glowStyle = {
    shadowOpacity: glowAnim,
  };

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={30}
            color="#00FFFF"
          />
        </TouchableOpacity>
        <View style={styles.timelineWrapper}>
          <Animated.View
            style={[styles.timeline, { width: timelineWidth }, glowStyle]}
            {...panResponder.panHandlers}
          >
            <View style={[styles.scrubber, { left: safePosition }]} />
          </Animated.View>
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>
      <Thumbnail
        uri={thumbnailUri}
        time={(safePosition / timelineWidth) * durationRef.current}
        position={safePosition + 50} // Adjust for play button width
        width={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000080',
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  timelineWrapper: {
    flex: 1,
  },
  timeline: {
    height: 10,
    backgroundColor: '#FF00FF',
    borderRadius: 5,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  scrubber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00FFFF',
    position: 'absolute',
    top: -5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Timeline;
