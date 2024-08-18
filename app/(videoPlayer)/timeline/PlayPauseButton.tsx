import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PLAY_BUTTON_SIZE } from './constants';
import { PlayPauseButtonProps } from './types';

const PlayPauseButton: React.FC<PlayPauseButtonProps> = React.memo(
  ({ isPlaying, onPlayPause }) => (
    <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
      <MaterialIcons
        name={isPlaying ? 'pause' : 'play-arrow'}
        size={20}
        color="#00FFFF"
      />
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  playButton: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000080',
    borderRadius: 25,
    marginLeft: -30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
});

export default PlayPauseButton;
