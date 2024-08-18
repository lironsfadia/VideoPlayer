export interface TextOverlayProps {
  id: number;
  initialText: string;
  initialPosition: { x: number; y: number };
  onUpdate: (
    id: number,
    text: string,
    position: { x: number; y: number }
  ) => void;
  onDelete: (id: number) => void;
}

export interface AddTextOverlayProps {
  onAdd: (text: string, position: { x: number; y: number }) => void;
  onCancel: () => void;
}

export interface TextOverlayType {
  id: number;
  time: number;
  text: string;
  position: { x: number; y: number };
}
export interface OverlayManagerProps {
  videoId: string;
  textOverlays: TextOverlayType[];
  currentTime: number;
  isAddingText: boolean;
  onAddNewText: () => void;
  onCancelAddText: () => void;
  onUpdateOverlay: (
    id: number,
    text: string,
    position: { x: number; y: number }
  ) => void;
  onDeleteOverlay: (id: number) => void;
  setTextOverlays: (overlays: TextOverlayType[]) => void;
}

export type UseOverlayManagerProps = Pick<
  OverlayManagerProps,
  'videoId' | 'textOverlays' | 'currentTime' | 'setTextOverlays'
>;
