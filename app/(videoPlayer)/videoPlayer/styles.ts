import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const CONTENT_WIDTH = screenWidth - HORIZONTAL_PADDING;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: HORIZONTAL_PADDING / 2,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
    width: CONTENT_WIDTH,
    marginTop: 10,
    marginBottom: 100, // Add space for controls
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
    fontSize: 16,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    zIndex: 10,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: HORIZONTAL_PADDING / 2,
    right: HORIZONTAL_PADDING / 2,
    marginRight: 30,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  timelineWrapper: {
    width: CONTENT_WIDTH,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    zIndex: 2,
  },
});
