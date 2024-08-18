import React from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

import { Text } from '@/app/components/ui/text';
import { TextOverlayProps } from './types';
import useTextOverlay from './useTextOverlay';

const TextOverlay = ({
  id,
  initialText,
  initialPosition,
  onUpdate,
  onDelete,
}: TextOverlayProps) => {
  const {
    text,
    editing,
    panResponder,
    animatedStyle,
    handleTextChange,
    handleEditToggle,
    handleBlur,
    handleDelete,
  } = useTextOverlay({ id, initialText, initialPosition, onUpdate, onDelete });

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      {...panResponder.panHandlers}
    >
      {editing ? (
        <TextInput
          value={text}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          style={styles.input}
          autoFocus
        />
      ) : (
        <View>
          <Text onPress={handleEditToggle} style={styles.text}>
            {text}
          </Text>
          <Text onPress={handleDelete} style={styles.deleteButton}>
            ✕
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    color: 'white',
    fontSize: 18,
    minWidth: 100,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TextOverlay;
