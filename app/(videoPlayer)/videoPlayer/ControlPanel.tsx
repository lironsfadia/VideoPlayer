// ControlPanel.tsx
import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ControlPanelProps } from './types';
import Timeline from '../timeline/Timeline';
import ActionButton from '../ui/ActionButton';

const ControlPanel = ({
  videoRef,
  duration,
  currentTime,
  isPlaying,
  thumbnailUri,
  onScrub,
  onFrameUpdate,
  onPlayPause,
  onAddTextOverlay,
  onTrimPress,
  onSavePress,
}: ControlPanelProps) => (
  <View style={styles.controlsContainer}>
    <Timeline
      videoRef={videoRef}
      duration={duration}
      onScrub={onScrub}
      currentTime={currentTime}
      onFrameUpdate={onFrameUpdate}
      thumbnailUri={thumbnailUri}
      isPlaying={isPlaying}
      onPlayPause={onPlayPause}
    />
    <View style={styles.buttonContainer}>
      <ActionButton
        title="Add Text"
        handlePress={onAddTextOverlay}
        iconName={'text-format'}
      />
      <ActionButton
        title="Trim"
        handlePress={onTrimPress}
        iconName={'content-cut'}
      />
      <ActionButton
        title="Upload"
        handlePress={onSavePress}
        iconName={'save'}
      />
    </View>
  </View>
);

export default ControlPanel;
