// useTimeline.ts
import { useState, useEffect, useRef, useMemo } from 'react';
import { PanResponder, Animated, Dimensions } from 'react-native';
import { TimelineHookProps, TimelineHookReturn } from './timelineTypes';
import { TIMELINE_PADDING } from './constants';

export const useTimeline = ({
  duration,
  currentTime,
  onScrub,
  videoRef,
  onFrameUpdate,
  generateThumbnail,
}: TimelineHookProps): TimelineHookReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const timelineWidth = Dimensions.get('window').width - TIMELINE_PADDING;
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
  }, [currentTime, duration, isDragging, timelineWidth, glowAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = Math.max(
          0,
          Math.min(gestureState.moveX - 50, timelineWidth)
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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return {
    isDragging,
    debugInfo,
    timelineWidth,
    panResponder,
    safePosition,
    glowAnim,
    formatTime,
    durationRef,
  };
};
