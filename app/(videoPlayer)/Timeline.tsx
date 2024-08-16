import React, { useRef, useState } from 'react';
import { View, PanResponder, StyleSheet, Dimensions } from 'react-native';

const Timeline = ({ duration, onScrub }) => {
  const [position, setPosition] = useState(0);
  const timelineWidth = Dimensions.get('window').width - 20; // Adjust for padding

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newPosition = Math.max(
          0,
          Math.min(gestureState.moveX, timelineWidth)
        );
        setPosition(newPosition);
        onScrub((newPosition / timelineWidth) * duration);
      },
    })
  ).current;

  return (
    <View
      style={[styles.timeline, { width: timelineWidth }]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.scrubber, { left: position }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  scrubber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
});

export default Timeline;
