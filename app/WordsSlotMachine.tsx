import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';

const words = ['React', 'Native', 'Reanimated', 'Slot', 'Machine'];
const ITEM_HEIGHT = 50;

const WordSlotMachine = () => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const scrollY = useSharedValue(0);
  const isSpinning = useRef(false);

  useEffect(() => {
    spin();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value % (words.length * ITEM_HEIGHT) }],
    };
  });

  const spin = () => {
    if (isSpinning.current) return;

    isSpinning.current = true;
    const duration = 2000;
    const spins = 20;

    scrollY.value = withRepeat(
      withTiming(-(words.length * ITEM_HEIGHT * spins), { duration }),
      1,
      false,
      (finished) => {
        if (finished) {
          runOnJS(stopSpin)();
        }
      }
    );
  };

  const stopSpin = () => {
    cancelAnimation(scrollY);
    const index = Math.floor(
      Math.abs(scrollY.value / ITEM_HEIGHT) % words.length
    );
    setCurrentWord(words[index]);
    isSpinning.current = false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.slotMachine}>
        <Animated.View style={[styles.wordList, animatedStyle]}>
          {words.concat(words).map((word, index) => (
            <Text key={index} style={styles.word}>
              {word}
            </Text>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotMachine: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  wordList: {
    width: 150,
  },
  word: {
    height: ITEM_HEIGHT,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  currentWord: {
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WordSlotMachine;
