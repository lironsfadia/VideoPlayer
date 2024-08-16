import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Text } from '@/components/ui/text';

interface AddTextOverlayProps {
  onAdd: (text: string, position: { x: number; y: number }) => void;
  onCancel: () => void;
}

const AddTextOverlay = ({ onAdd, onCancel }: AddTextOverlayProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { width, height } = Dimensions.get('window');
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

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text, { x: width / 2 - 75, y: height / 2 - 20 });
    } else {
      onCancel();
    }
  };

  const glowStyle = {
    shadowOpacity: glowAnim,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, glowStyle]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={setText}
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
