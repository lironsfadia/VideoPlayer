// VideoComponent.tsx
import React from 'react';
import Video from 'react-native-video';
import styles from './styles';
import { VideoComponentProps } from './types';

const VideoComponent = ({
  videoRef,
  source,
  onProgress,
  onBuffer,
  onError,
  onLoad,
}: VideoComponentProps) => (
  <Video
    ref={videoRef}
    source={source}
    style={styles.video}
    onProgress={onProgress}
    resizeMode="cover"
    repeat
    playInBackground={false}
    onBuffer={onBuffer}
    onError={onError}
    onLoad={onLoad}
  />
);

export default VideoComponent;
