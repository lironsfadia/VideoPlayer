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
  onSavePress: () => void;
}

export interface OverlayManagerProps {
  videoId: string;
  textOverlays: any[];
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
