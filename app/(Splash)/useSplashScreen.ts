import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';

import { ITEM_HEIGHT } from './consts';
import { getScreenDimensions } from '@/app/(videoPlayer)/timeline/core/utils';

const useSplashScreen = () => {
  const words = [
    'Video Player',
    'Add Overlay Texts',
    'Upload Videos',
    'Seek',
    'Trim',
    'See Thumbnails',
    'Watch Videos',
  ];
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

export default useSplashScreen;
