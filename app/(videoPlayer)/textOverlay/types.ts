export interface TextOverlayProps {
  id: number;
  initialText: string;
  initialPosition: { x: number; y: number };
  onUpdate: (
    id: number,
    text: string,
    time: number,
    position: { x: number; y: number }
  ) => void;
  onDelete: (id: number) => void;
}
