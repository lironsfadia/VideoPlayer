import { useState, useRef, useCallback } from 'react';
import { PanResponder, Animated } from 'react-native';
import { TextOverlayProps } from './types';

const useTextOverlay = ({
  id,
  initialText,
  initialPosition,
  onUpdate,
  onDelete,
}: TextOverlayProps) => {
  const [text, setText] = useState(initialText);
  const [editing, setEditing] = useState(false);
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleEditToggle = useCallback(() => {
    setEditing((prev) => !prev);
  }, []);

  const handleBlur = useCallback(() => {
    setEditing(false);
    onUpdate(id, text, { x: pan.x._value, y: pan.y._value });
  }, [id, text, pan, onUpdate]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      onUpdate(id, text, { x: pan.x._value, y: pan.y._value });
    },
  });

  const animatedStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  return {
    text,
    editing,
    pan,
    panResponder,
    animatedStyle,
    handleTextChange,
    handleEditToggle,
    handleBlur,
    handleDelete,
  };
};

export default useTextOverlay;
