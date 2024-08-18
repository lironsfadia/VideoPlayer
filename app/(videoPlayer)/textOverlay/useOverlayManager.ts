import { useEffect, useMemo } from 'react';
import { OVERLAY_DURATION } from './consts';
import { UseOverlayManagerProps } from './types';
import { loadOverlays } from '../core/utils';

const useOverlayManager = ({
  videoId,
  textOverlays,
  currentTime,
  setTextOverlays,
}: UseOverlayManagerProps) => {
  useEffect(() => {
    const fetchOverlays = async () => {
      const savedOverlays = await loadOverlays(videoId);
      if (savedOverlays) {
        setTextOverlays(savedOverlays);
      }
    };

    fetchOverlays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const visibleOverlays = useMemo(() => {
    return textOverlays.filter((overlay) => {
      const diff =
        Number(currentTime.toFixed(2)) - Number(overlay.time.toFixed(2));
      return diff > 0 && diff < OVERLAY_DURATION;
    });
  }, [textOverlays, currentTime]);

  return {
    visibleOverlays,
  };
};

export default useOverlayManager;
