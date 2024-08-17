export interface ThumbnailProps {
  uri: string;
  time: number;
  position: number;
  width: number;
}

export interface TimelineProps {
  duration: number;
  currentTime: number;
  onScrub: (args: { videoRef: any; time: number }) => void;
  videoRef: any;
  onFrameUpdate: (time: number) => void;
  thumbnailUri: string;
  onPlayPause: () => void;
  isPlaying: boolean;
}

export interface useThumbnailProps {
  position: number;
  width: number;
}
