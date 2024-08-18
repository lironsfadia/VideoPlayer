import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import Thumbnail from '../thumbnail/Thumbnail';
import { TimelineProps } from './types';
import { useTimeline } from './useTimeline';
import TimeDisplay from './TimeDisplay';
import TimelineScrubber from './TimelineScrubber';
import PlayPauseButton from './PlayPauseButton';

const Timeline: React.FC<TimelineProps> = ({
  duration,
  currentTime,
  onScrub,
  videoRef,
  onFrameUpdate,
  thumbnailUri,
  onPlayPause,
  isPlaying,
}) => {
  const {
    timelineWidth,
    panResponder,
    safePosition,
    glowAnim,
    formatTime,
    durationRef,
  } = useTimeline({
    duration,
    currentTime,
    onScrub,
    videoRef,
    onFrameUpdate,
  });

  const glowStyle = useMemo(() => ({ shadowOpacity: glowAnim }), [glowAnim]);

  const thumbnailComponent = useMemo(() => {
    if (!isPlaying && thumbnailUri) {
      return (
        <Thumbnail
          uri={thumbnailUri}
          time={(safePosition / timelineWidth) * durationRef.current}
          position={Math.min(safePosition, timelineWidth - 100)}
          width={100}
        />
      );
    }
    return null;
  }, [isPlaying, thumbnailUri, safePosition, timelineWidth, durationRef]);

  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <PlayPauseButton isPlaying={isPlaying} onPlayPause={onPlayPause} />
        <View style={styles.timelineWrapper}>
          <TimelineScrubber
            timelineWidth={timelineWidth}
            safePosition={safePosition}
            glowStyle={glowStyle}
            panResponder={panResponder}
          />
          <TimeDisplay
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
          />
        </View>
      </View>
      {thumbnailComponent}
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
  timelineWrapper: {
    flex: 1,
  },
});

export default React.memo(Timeline);
