import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Thumbnail from '../thumbnail/Thumbnail';
import { TimelineProps } from './types';
import { useTimeline } from './useTimeline';
import { PLAY_BUTTON_SIZE, SCRUBBER_SIZE } from './constants';

const Timeline = ({
  duration,
  currentTime,
  onScrub,
  videoRef,
  onFrameUpdate,
  thumbnailUri,
  onPlayPause,
  isPlaying,
}: TimelineProps) => {
  const {
    timelineWidth,
    panResponder,
    safePosition,
    glowAnim,
    formatTime,
    durationRef,
    isDragging,
  } = useTimeline({
    duration,
    currentTime,
    onScrub,
    videoRef,
    onFrameUpdate,
  });

  const glowStyle = {
    shadowOpacity: glowAnim,
  };

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={20}
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
            <Text style={[styles.timeText, styles.endTimeText]}>
              {formatTime(duration)}
            </Text>
          </View>
        </View>
      </View>
      {!isPlaying && thumbnailUri && (
        <Thumbnail
          uri={thumbnailUri}
          time={(safePosition / timelineWidth) * durationRef.current}
          position={Math.min(safePosition, timelineWidth - 100)}
          width={100}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000080',
    borderRadius: 25,
    marginLeft: -30,
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
    width: SCRUBBER_SIZE,
    height: SCRUBBER_SIZE,
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
    paddingRight: 20, // Add padding to the right to bring the end time text to the left
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  endTimeText: {
    position: 'absolute',
    right: 20, // Position the end time text 20 pixels from the right edge
  },
});

export default Timeline;
