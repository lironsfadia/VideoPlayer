import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { Text } from '@/app/components/ui/text';
import { AddTextOverlayProps } from './types';
import useAddTextOverlay from './useAddTextOverlay';

const AddTextOverlay = ({ onAdd, onCancel }: AddTextOverlayProps) => {
  const { text, inputRef, glowStyle, handleAdd, handleTextChange } =
    useAddTextOverlay({ onAdd, onCancel });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, glowStyle]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Enter rad text"
          placeholderTextColor="rgba(255,255,255,0.5)"
          autoFocus
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#000080', // Deep blue background
    borderRadius: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FF00FF', // Neon pink border
    shadowColor: '#00FFFF', // Cyan glow
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FF00FF', // Neon pink underline
    marginBottom: 20,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  addButton: {
    backgroundColor: '#00FFFF', // Cyan background
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF00FF', // Neon pink background
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000080', // Deep blue text
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default AddTextOverlay;
