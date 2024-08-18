import React from 'react';
import AddTextOverlay from './AddTextOverlay';
import useOverlayManager from './useOverlayManager';
import { OverlayManagerProps, TextOverlayType } from './types';
import TextOverlay from './TextOverlay';

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
  const { visibleOverlays } = useOverlayManager({
    videoId,
    textOverlays,
    currentTime,
    setTextOverlays,
  });

  return (
    <>
      {visibleOverlays.map((overlay: TextOverlayType) => (
        <TextOverlay
          key={overlay.id}
          id={overlay.id}
          initialText={overlay.text}
          initialPosition={overlay.position}
          onUpdate={onUpdateOverlay}
          onDelete={onDeleteOverlay}
        />
      ))}
      {isAddingText && (
        <AddTextOverlay onAdd={onAddNewText} onCancel={onCancelAddText} />
      )}
    </>
  );
};

export default OverlayManager;
