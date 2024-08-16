import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';

const Thumbnail = ({ uri, time, position, width }) => {
  if (!uri) return null;

  const thumbnailPosition = Math.max(
    0,
    Math.min(position - width / 2, position)
  );

  return (
    <View style={[styles.container, { left: thumbnailPosition }]}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.timeText}>{formatTime(time)}</Text>
    </View>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 56,
    borderRadius: 4,
  },
  timeText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
});

export default Thumbnail;
