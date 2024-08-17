import React from 'react';
import AddTextOverlay from './AddTextOverlay';
import TextOverlay from './TextOverlay';
import { OverlayManagerProps } from '../videoPlayer/types';

const OverlayManager = ({
  textOverlays,
  currentTime,
  isAddingText,
  onAddNewText,
  onCancelAddText,
  onUpdateOverlay,
  onDeleteOverlay,
}: OverlayManagerProps) => (
  <>
    {textOverlays.map((overlay) => {
      const diff =
        Number(currentTime.toFixed(2)) - Number(overlay.time.toFixed(2));
      return diff > 0 && diff < 0.5 ? (
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

export default OverlayManager;
