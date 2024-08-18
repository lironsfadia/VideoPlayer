import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SCRUBBER_SIZE } from './constants';

interface TimelineScrubberProps {
  timelineWidth: Animated.Value;
  safePosition: Animated.Value;
  glowStyle: { shadowOpacity: Animated.Value };
  panResponder: any;
}

const TimelineScrubber: React.FC<TimelineScrubberProps> = React.memo(
  ({ timelineWidth, safePosition, glowStyle, panResponder }) => (
    <Animated.View
      style={[styles.timeline, { width: timelineWidth }, glowStyle]}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[styles.scrubber, { left: safePosition }]} />
    </Animated.View>
  )
);

const styles = StyleSheet.create({
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
});

export default TimelineScrubber;
