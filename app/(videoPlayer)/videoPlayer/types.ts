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
  textOverlays: TextOverlay[];
}

export interface TextOverlay {
  id: number;
  time: number;
  text: string;
  position: { x: number; y: number };
}
export interface OverlayManagerProps {
  videoId: string;
  textOverlays: TextOverlay[];
  currentTime: number;
  isAddingText: boolean;
  onAddNewText: () => void;
  onCancelAddText: () => void;
  onUpdateOverlay: (
    id: number,
    text: string,
    position: { x: number; y: number }
  ) => void;
  onDeleteOverlay: (id: number) => void;
}

export interface useVideoActionsProps {
  videoId: string;
  textOverlays: TextOverlay[];
}
