interface VideoRef {
  current: {
    seek: (time: number) => void;
    pause: () => void;
  } | null;
}

interface ScrubParams {
  time: number;
  videoRef: VideoRef;
}

interface VideoActions {
  isInTrimProgress: boolean;
  handleScrub: (params: ScrubParams) => void;
  handleTrim: (
    startTime: string | number,
    endTime: string | number,
    source: string,
    videoRef: VideoRef
  ) => Promise<void>;
}

export { VideoRef, ScrubParams, VideoActions };
