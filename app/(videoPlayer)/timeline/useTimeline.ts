import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { PanResponder, Animated, Dimensions } from 'react-native';
import { TimelineHookProps, TimelineHookReturn } from './timelineTypes';
import { TIMELINE_PADDING } from './constants';

const useAnimatedGlow = () => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, [glowAnim]);

  return glowAnim;
};

const useTimelinePosition = (
  duration: number,
  currentTime: number,
  timelineWidth: number
) => {
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(0);

  useEffect(() => {
    if (!isDragging && duration > 0) {
      const newPosition = (currentTime / duration) * timelineWidth;
      positionRef.current = isNaN(newPosition)
        ? 0
        : Math.max(0, Math.min(newPosition, timelineWidth));
    }
  }, [currentTime, duration, isDragging, timelineWidth]);

  return { isDragging, setIsDragging, positionRef };
};

export const useTimeline = ({
  duration,
  currentTime,
  onScrub,
  videoRef,
  onFrameUpdate,
}: TimelineHookProps): TimelineHookReturn => {
  const [debugInfo, setDebugInfo] = useState('');
  const timelineWidth = Dimensions.get('window').width - TIMELINE_PADDING;
  const durationRef = useRef(duration);
  const glowAnim = useAnimatedGlow();
  const { isDragging, setIsDragging, positionRef } = useTimelinePosition(
    duration,
    currentTime,
    timelineWidth
  );

  useEffect(() => {
    durationRef.current = duration;
    setDebugInfo(`Duration: ${duration}, CurrentTime: ${currentTime}`);
  }, [currentTime, duration]);

  const handlePanResponderRelease = useCallback(() => {
    setIsDragging(false);
    const currentDuration = durationRef.current;
    if (currentDuration > 0) {
      const time = (positionRef.current / timelineWidth) * currentDuration;
      const safeTime = isNaN(time) ? 0 : time;
      onScrub({ videoRef: videoRef, time: safeTime });
      onFrameUpdate(safeTime);
    }
  }, [onScrub, onFrameUpdate, timelineWidth, videoRef]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => setIsDragging(true),
        onPanResponderMove: (_, gestureState) => {
          positionRef.current = Math.max(
            0,
            Math.min(gestureState.moveX - 50, timelineWidth)
          );
        },
        onPanResponderRelease: handlePanResponderRelease,
      }),
    [setIsDragging, timelineWidth, handlePanResponderRelease]
  );

  const safePosition = useMemo(
    () =>
      isNaN(positionRef.current)
        ? 0
        : Math.max(0, Math.min(positionRef.current, timelineWidth)),
    [positionRef.current, timelineWidth]
  );

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

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
