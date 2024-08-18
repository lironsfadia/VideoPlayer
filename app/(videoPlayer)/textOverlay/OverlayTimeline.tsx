import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TextOverlay } from './types';

const OverlayTimeline = ({ duration, textOverlays }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeline}>
        {textOverlays.map((overlay) => (
          <View
            key={overlay.id}
            style={[
              styles.overlayMarker,
              { left: `${(overlay.time / duration) * 100}%` },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    marginBottom: 5,
  },
  timeline: {
    height: 5,
    backgroundColor: '#333',
    borderRadius: 2.5,
    position: 'relative',
  },
  overlayMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FFFF',
    position: 'absolute',
    top: -2.5,
    marginLeft: -5,
  },
});

export default OverlayTimeline;
