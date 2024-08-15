import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ source, textOverlays }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={source}
        style={styles.video}
        onProgress={onProgress}
        resizeMode="contain"
      />
      {textOverlays.map((overlay, index) => (
        overlay.timestamp <= currentTime && (
          <View key={index} style={[styles.overlay, { top: overlay.y, left: overlay.x }]}>
            <Text style={styles.overlayText}>{overlay.text}</Text>
          </View>
        )
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
  },
});

export default VideoPlayer;