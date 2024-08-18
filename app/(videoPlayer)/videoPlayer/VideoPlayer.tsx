import React from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import useVideoPlayer from './useVideoPlayer';
import VideoComponent from './VideoComponent';
import OverlayManager from '../textOverlay/OverlayManager';
import ControlPanel from './ControlPanel';
import { Text } from '@/components/ui/text';
import styles from './styles';
import TrimInputModal from '../trim/TrimInputModal';

const VideoPlayer = ({ source }) => {
  const {
    videoRef,
    isPlaying,
    isTrimModalVisible,
    setIsTrimModalVisible,
    handlePlayPause,
    onTrim,
    onProgress,
    onBuffer,
    onError,
    onLoad,
    currentTime,
    videoLoaded,
    thumbnailUri,
    duration,
    textOverlays,
    isAddingText,
    handleAddTextOverlay,
    handleAddNewText,
    handleCancelAddText,
    handleUpdateOverlay,
    handleDeleteOverlay,
    handleScrub,
    handleFrameUpdate,
    handleSave,
    setTextOverlays,
    isInTrimProgress,
  } = useVideoPlayer(source);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          {isInTrimProgress && <ActivityIndicator />}
          {!isInTrimProgress && (
            <VideoComponent
              videoRef={videoRef}
              source={source}
              onProgress={onProgress}
              onBuffer={onBuffer}
              onError={onError}
              onLoad={onLoad}
            />
          )}
          {(!videoLoaded || isInTrimProgress) && (
            <Text style={styles.loadingText}>Loading video...</Text>
          )}
          <OverlayManager
            videoId={source.uri}
            textOverlays={textOverlays}
            currentTime={currentTime}
            isAddingText={isAddingText}
            onAddNewText={handleAddNewText}
            onCancelAddText={handleCancelAddText}
            onUpdateOverlay={handleUpdateOverlay}
            onDeleteOverlay={handleDeleteOverlay}
            duration={duration}
            setTextOverlays={setTextOverlays}
          />
        </View>
        <View style={styles.controlsContainer}>
          <ControlPanel
            videoRef={videoRef}
            duration={duration}
            currentTime={currentTime}
            isPlaying={isPlaying}
            thumbnailUri={thumbnailUri}
            onScrub={handleScrub}
            onFrameUpdate={handleFrameUpdate}
            onPlayPause={handlePlayPause}
            onAddTextOverlay={handleAddTextOverlay}
            onTrimPress={() => setIsTrimModalVisible(true)}
            onSavePress={handleSave}
            textOverlays={textOverlays}
          />
        </View>
      </View>
      {isTrimModalVisible && (
        <TrimInputModal
          onClose={() => setIsTrimModalVisible(false)}
          onTrim={onTrim}
          duration={duration}
        />
      )}
    </SafeAreaView>
  );
};

export default VideoPlayer;
