import React from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { ITEM_HEIGHT } from './consts';
import useWordSlotMachine from './useWordSlotMachine';
import AnimatedDots from '@/components/ui/AnimatedDots';

const WordSlotMachine = () => {
  const { animatedStyle, words, height, width } = useWordSlotMachine();

  const dots = Array(50)
    .fill(0)
    .map((_, i) => (
      <AnimatedDots
        key={i}
        startPos={{ x: Math.random() * width, y: Math.random() * height }}
      />
    ));

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      {dots}
      <View className="w-4/5 items-center">
        <Text className="text-4xl font-bold text-fuchsia-500 mb-8">
          Papaya's Exercise V1
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

export default WordSlotMachine;
