export interface VideoProps {
  fileCopyUri: null;
  name: string;
  size: number;
  type: string;
  uri: string;
}

export interface UploadVideoProps {
  onFinishUpload: (video: Pick<VideoProps, 'uri'>) => void;
}

export interface useUploadVideoProps {
  onFinishUpload: (video: Pick<VideoProps, 'uri'>) => void;
}
