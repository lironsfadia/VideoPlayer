import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { AddTextOverlayProps } from './types';

const useAddTextOverlay = ({ onAdd, onCancel }: AddTextOverlayProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleAdd = useCallback(() => {
    if (text.trim()) {
      onAdd(text, { x: 50, y: 50 });
    } else {
      onCancel();
    }
  }, [text, onAdd, onCancel]);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const glowStyle = {
    shadowOpacity: glowAnim,
  };

  return {
    text,
    inputRef,
    glowStyle,
    handleAdd,
    handleTextChange,
  };
};

export default useAddTextOverlay;
