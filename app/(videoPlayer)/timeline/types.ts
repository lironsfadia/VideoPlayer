import { Animated } from 'react-native';

export interface TimelineProps {
  duration: number;
  currentTime: number;
  onScrub: (params: { videoRef: any; time: number }) => void;
  videoRef: any;
  onFrameUpdate: (time: number) => void;
  thumbnailUri: string;
  onPlayPause: () => void;
  isPlaying: boolean;
}

export interface TimelineHookProps {
  duration: number;
  currentTime: number;
  onScrub: (params: { videoRef: any; time: number }) => void;
  videoRef: any;
  onFrameUpdate: (time: number) => void;
}

export interface TimelineHookReturn {
  isDragging: boolean;
  debugInfo: string;
  timelineWidth: number;
  panResponder: PanResponder.PanResponderInstance;
  safePosition: number;
  glowAnim: Animated.Value;
  formatTime: (timeInSeconds: number) => string;
}
