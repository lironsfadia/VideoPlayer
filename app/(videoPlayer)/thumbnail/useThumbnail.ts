import { useRef, useCallback, useMemo } from 'react';
import { useThumbnailProps } from './types';

const useThumbnail = ({ position, width }: useThumbnailProps) => {
  const positionRef = useRef(position);
  const widthRef = useRef(width);

  useMemo(() => {
    positionRef.current = position;
    widthRef.current = width;
  }, [position, width]);

  const calculateThumbnailPosition = useCallback(() => {
    return Math.max(
      0,
      Math.min(positionRef.current - widthRef.current / 2, positionRef.current)
    );
  }, []);

  const thumbnailPosition = useMemo(
    () => calculateThumbnailPosition(),
    [calculateThumbnailPosition]
  );

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  return { thumbnailPosition, formatTime };
};

export default useThumbnail;
