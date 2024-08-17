import React, { useEffect, useRef } from 'react';
import AddTextOverlay from './AddTextOverlay';
import TextOverlay from './TextOverlay';
import { OverlayManagerProps } from '../videoPlayer/types';
import { loadOverlays, saveOverlays } from '@/core/utils';
import { OVERLAY_DURATION } from './consts';

const OverlayManager = ({
  videoId,
  textOverlays,
  currentTime,
  isAddingText,
  onAddNewText,
  onCancelAddText,
  onUpdateOverlay,
  onDeleteOverlay,
  setTextOverlays,
}: OverlayManagerProps) => {
  const textOverlaysRef = useRef(textOverlays);

  // Update the ref whenever textOverlays changes
  useEffect(() => {
    textOverlaysRef.current = textOverlays;
  }, [textOverlays]);

  // Load overlays on mount and save on unmount
  useEffect(() => {
    const fetchOverlays = async () => {
      const savedOverlays = await loadOverlays(videoId);
      if (savedOverlays) {
        setTextOverlays(savedOverlays);
      }
    };

    fetchOverlays();

    // Cleanup function to save overlays on unmount
    return () => {
      if (videoId && textOverlaysRef.current.length > 0) {
        saveOverlays(videoId, textOverlaysRef.current);
      }
    };
  }, [videoId, setTextOverlays]);

  return (
    <>
      {textOverlays.map((overlay) => {
        const diff =
          Number(currentTime.toFixed(2)) - Number(overlay.time.toFixed(2));
        return diff > 0 && diff < OVERLAY_DURATION ? (
          <TextOverlay
            key={overlay.id}
            id={overlay.id}
            initialText={overlay.text}
            initialPosition={overlay.position}
            onUpdate={onUpdateOverlay}
            onDelete={onDeleteOverlay}
          />
        ) : null;
      })}
      {isAddingText && (
        <AddTextOverlay onAdd={onAddNewText} onCancel={onCancelAddText} />
      )}
    </>
  );
};

export default OverlayManager;
