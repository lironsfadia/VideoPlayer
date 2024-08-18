import { useMemo } from 'react';
import { UploadVideoButtonProps } from './types';

const useUploadVideoButton = ({
  videoName,
  isUploading,
  video,
}: UploadVideoButtonProps): string => {
  const uploadingTitle = 'Uploading...';
  const selectVideoTitle = 'Select Video';

  const startUploadTitle = useMemo(
    () => `Start Upload: "${videoName}"`,
    [videoName]
  );

  const buttonTitle = useMemo(() => {
    return isUploading
      ? uploadingTitle
      : video
        ? startUploadTitle
        : selectVideoTitle;
  }, [isUploading, video, videoName]);

  return buttonTitle;
};

export default useUploadVideoButton;
