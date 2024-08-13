import React, { useRef, useState } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

const Timeline = ({ duration, onScrub }) => {
  const [position, setPosition] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newPosition = Math.max(0, Math.min(gestureState.moveX, 300));
        setPosition(newPosition);
        onScrub((newPosition / 300) * duration);
      },
    })
  ).current;

  return (
    <View style={styles.timeline} {...panResponder.panHandlers}>
      <View style={[styles.scrubber, { left: position }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    height: 20,
    width: 300,
    backgroundColor: 'grey',
  },
  scrubber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
  },
});

export default Timeline;