import { useThumbnailProps } from '../videoPlayer/types';

const useThumbnail = ({ position, width }: useThumbnailProps) => {
  const thumbnailPosition = Math.max(
    0,
    Math.min(position - width / 2, position)
  );

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return { thumbnailPosition, formatTime };
};

export default useThumbnail;
