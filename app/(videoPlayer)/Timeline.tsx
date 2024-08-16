import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const Timeline = ({ duration, currentTime, onScrub, videoRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const timelineWidth = Dimensions.get('window').width - 20; // Adjust for padding

  // Use a ref to store the latest duration value
  const durationRef = useRef(duration);
  const positionRef = useRef(0);

  useEffect(() => {
    durationRef.current = duration;
    setDebugInfo(`Duration: ${duration}, CurrentTime: ${currentTime}`);

    if (!isDragging && duration > 0) {
      const newPosition = (currentTime / duration) * timelineWidth;
      positionRef.current = isNaN(newPosition)
        ? 0
        : Math.max(0, Math.min(newPosition, timelineWidth));
    }
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
          Math.min(gestureState.moveX, timelineWidth)
        );
        positionRef.current = newPosition;
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        const currentDuration = durationRef.current;
        console.log('Release duration:', currentDuration);

        if (currentDuration > 0) {
          const time = (positionRef.current / timelineWidth) * currentDuration;
          console.log('Scrubbing to time:', {
            positionRef: positionRef.current,
            timelineWidth,
            currentDuration,
          });
          onScrub({ videoRef: videoRef, time: isNaN(time) ? 0 : time });
        } else {
          console.warn('Cannot scrub: duration is 0 or invalid');
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

  const handlePress = () => {
    setDebugInfo(
      `Pressed. Duration: ${durationRef.current}, CurrentTime: ${currentTime}`
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View
          style={[styles.timeline, { width: timelineWidth }]}
          {...panResponder.panHandlers}
        >
          <View style={[styles.scrubber, { left: safePosition }]} />
        </View>
        <Text style={styles.debugText}>{debugInfo}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
  debugText: {
    color: 'white',
    marginTop: 5,
  },
});

export default Timeline;
