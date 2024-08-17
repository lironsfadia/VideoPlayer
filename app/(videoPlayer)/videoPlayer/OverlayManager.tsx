import React from 'react';
import AddTextOverlay from '../textOverlay/AddTextOverlay';
import TextOverlay from '../textOverlay/TextOverlay';

const OverlayManager = ({
  textOverlays,
  currentTime,
  isAddingText,
  onAddNewText,
  onCancelAddText,
  onUpdateOverlay,
  onDeleteOverlay,
}) => (
  <>
    {textOverlays.map((overlay) =>
      currentTime.toFixed(2) < overlay.time.toFixed(2) + 0.1 ? (
        <TextOverlay
          key={overlay.id}
          id={overlay.id}
          initialText={overlay.text}
          initialPosition={overlay.position}
          onUpdate={onUpdateOverlay}
          onDelete={onDeleteOverlay}
        />
      ) : null
    )}
    {isAddingText && (
      <AddTextOverlay onAdd={onAddNewText} onCancel={onCancelAddText} />
    )}
  </>
);

export default OverlayManager;
