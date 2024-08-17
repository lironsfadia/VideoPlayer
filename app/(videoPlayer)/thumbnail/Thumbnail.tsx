import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { ThumbnailProps } from './types';
import useThumbnail from './useThumbnail';

const Thumbnail = ({ uri, time, position, width }: ThumbnailProps) => {
  const { thumbnailPosition, formatTime } = useThumbnail({
    position,
    width,
  });

  if (!uri) return null;

  return (
    <View style={[styles.container, { left: thumbnailPosition }]}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.timeText}>{formatTime(time)}</Text>
    </View>
  );
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
