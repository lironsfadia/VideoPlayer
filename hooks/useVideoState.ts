import { useState } from 'react';
import { TextOverlay } from '../types';

export function useVideoState() {
  const [videoSource, setVideoSource] = useState<{ uri: string } | null>(null);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleFileSelect = (file: { uri: string }) => {
    setVideoSource({ uri: file.uri });
  };

  const handleAddTextOverlay = () => {
    const newOverlay: TextOverlay = { id: Date.now(), text: 'New Overlay', position: { x: 0, y: 0 } };
    setTextOverlays([...textOverlays, newOverlay]);
  };

  const handleSetVideoDuration = (data: { duration: number }) => {
    setVideoDuration(data.duration);
  };

  return {
    videoSource,
    textOverlays,
    trimStart,
    trimEnd,
    videoDuration,
    handleFileSelect,
    handleAddTextOverlay,
    handleSetVideoDuration,
    setTrimStart,
    setTrimEnd,
  };
}