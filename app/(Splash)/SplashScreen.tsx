import React from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import Snow from '@/components/ui/Snow';
import useSplashScreen from './useSplashScreen';

import { ITEM_HEIGHT, SPLASH_TITLE } from './consts';

const SplashScreen = () => {
  const { animatedStyle, words } = useSplashScreen();

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      {Snow()}
      <View className="w-4/5 items-center">
        <Text className="text-4xl font-bold text-fuchsia-500 mb-8">
          {SPLASH_TITLE}
        </Text>
        <View
          className="overflow-hidden border-2 border-fuchsia-500 rounded-md"
          style={{ height: ITEM_HEIGHT }}
        >
          <Animated.View className="w-[150px]" style={animatedStyle}>
            {words.concat(words).map((word, index) => (
              <Text
                key={index}
                className="text-center text-2xl font-bold text-white"
                style={{ height: ITEM_HEIGHT, lineHeight: ITEM_HEIGHT }}
              >
                {word}
              </Text>
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
