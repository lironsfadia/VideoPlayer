import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  PanResponder,
  Animated,
  StyleSheet,
} from 'react-native';
import { Text } from '@/components/ui/text';

interface TextOverlayProps {
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

const TextOverlay = ({
  id,
  initialText,
  initialPosition,
  onUpdate,
  onDelete,
}: TextOverlayProps) => {
  const [text, setText] = useState(initialText);
  const [editing, setEditing] = useState(false);
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      onUpdate(id, text, { x: pan.x._value, y: pan.y._value });
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
      {...panResponder.panHandlers}
    >
      {editing ? (
        <TextInput
          value={text}
          onChangeText={setText}
          onBlur={() => {
            setEditing(false);
            onUpdate(id, text, { x: pan.x._value, y: pan.y._value });
          }}
          style={styles.input}
          autoFocus
        />
      ) : (
        <View>
          <Text onPress={() => setEditing(true)} style={styles.text}>
            {text}
          </Text>
          <Text onPress={() => onDelete(id)} style={styles.deleteButton}>
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
