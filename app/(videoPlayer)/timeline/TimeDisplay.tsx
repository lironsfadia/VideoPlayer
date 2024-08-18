import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimeDisplayProps } from './types';

const TimeDisplay: React.FC<TimeDisplayProps> = React.memo(
  ({ currentTime, duration, formatTime }) => (
    <View style={styles.timeDisplay}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <Text style={[styles.timeText, styles.endTimeText]}>
        {formatTime(duration)}
      </Text>
    </View>
  )
);

const styles = StyleSheet.create({
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingRight: 20,
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
    right: 20,
  },
});

export default TimeDisplay;
