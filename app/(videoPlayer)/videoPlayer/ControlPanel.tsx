import React from 'react';
import { View } from 'react-native';
import { ControlPanelProps } from './types';
import Timeline from '../timeline/Timeline';
import OverlayTimeline from '../timeline/OverlayTimeline';
import ActionButtons from './ActionButtons';

const ControlPanel: React.FC<ControlPanelProps> = React.memo(
  ({
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
    textOverlays,
    isPendingTrimVersion,
    isInTrimProgress,
  }) => (
    <View>
      <OverlayTimeline duration={duration} textOverlays={textOverlays} />

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

      <ActionButtons
        onAddTextOverlay={onAddTextOverlay}
        onTrimPress={onTrimPress}
        onSavePress={onSavePress}
        disableAddText={isInTrimProgress}
        disableSave={!isPendingTrimVersion || isInTrimProgress}
        disableTrim={isInTrimProgress}
      />
    </View>
  )
);

export default ControlPanel;
