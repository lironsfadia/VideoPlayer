import { TextOverlayType } from '../textOverlay/types';

export interface VideoRef {
  current: {
    seek: (time: number) => void;
    pause: () => void;
  } | null;
}

export interface ScrubParams {
  time: number;
  videoRef: VideoRef;
}

export interface VideoActions {
  isInTrimProgress: boolean;
  handleSave: () => void;
  handleScrub: (params: ScrubParams) => void;
  handleTrim: (
    startTime: string | number,
    endTime: string | number,
    source: { uri: string },
    videoRef: VideoRef
  ) => Promise<void>;
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

export interface ControlPanelProps {
  videoRef: React.RefObject<any>;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  thumbnailUri: string;
  onScrub: (args: { videoRef: any; time: number }) => void;
  onFrameUpdate: (time: number) => void;
  onPlayPause: () => void;
  onAddTextOverlay: () => void;
  onTrimPress: () => void;
  onSavePress: (...args: any[]) => void;
  textOverlays: TextOverlayType[];
  isPendingTrimVersion: boolean;
  isInTrimProgress: boolean;
}

export interface useVideoActionsProps {
  videoId: string;
  textOverlays: TextOverlayType[];
}

export interface VideoComponentProps {
  videoRef: React.RefObject<any>;
  source: { uri: string };
  onProgress: (data: { currentTime: number; playableDuration: number }) => void;
  onBuffer: ({ isBuffering }: { isBuffering: boolean }) => void;
  onError: (error: { error: { code: number; message: string } }) => void;
  onLoad: (data: { duration: number }) => void;
}

export interface VideoPlayerProps {
  source: { uri: string };
}

export interface ActionButtonsProps {
  onAddTextOverlay: () => void;
  onTrimPress: () => void;
  onSavePress: () => void;
  disableAddText?: boolean;
  disableTrim?: boolean;
  disableSave?: boolean;
}
