import { useEffect } from 'react';
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native';

const AnimatedDots = ({ startPos }) => {
  const animatedValue = new Animated.Value(0);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000 + Math.random() * 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startPos.y, height],
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          left: startPos.x,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

export default AnimatedDots;

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
});
