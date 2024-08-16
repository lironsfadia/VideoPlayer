import { useEffect, useRef } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';
import { ITEM_HEIGHT } from './consts';
import { getScreenDimensions } from '@/core/utils';

const useWordSlotMachine = () => {
  const words = ['Video Player', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const scrollY = useSharedValue(0);
  const { width, height } = getScreenDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value % (words.length * ITEM_HEIGHT) }],
    };
  });

  const spin = () => {
    const duration = 2000;
    const pauseDuration = 500;
    const totalDuration = duration + pauseDuration;

    scrollY.value = withSequence(
      withTiming(-(words.length * ITEM_HEIGHT), { duration }),
      withDelay(pauseDuration, withTiming(0, { duration: 0 }))
    );

    setTimeout(spin, totalDuration);
  };

  useEffect(() => {
    spin();

    return () => {
      cancelAnimation(scrollY);
    };
  }, []);

  return { animatedStyle, words, height, width };
};

export default useWordSlotMachine;
