import React, { useCallback } from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import useAddTextOverlay from './useAddTextOverlay';
import { AddTextOverlayProps } from './types';

const AddTextOverlay: React.FC<AddTextOverlayProps> = ({ onCancel, onAdd }) => {
  const { text, inputRef, glowStyle, handleAdd, handleTextChange } =
    useAddTextOverlay({ onCancel, onAdd });

  const handleClosePress = useCallback(
    (event) => {
      event.stopPropagation();
      onCancel();
    },
    [onCancel]
  );

  return (
    <Modal
      transparent={true}
      visible={true}
      onRequestClose={handleClosePress}
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={handleTextChange}
                placeholder="Enter text"
                placeholderTextColor="rgba(0,0,128,0.5)"
                returnKeyType="done"
                onSubmitEditing={handleAdd}
                autoFocus={false}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: '#000080',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#00FFFF',
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    width: 200,
    color: '#000080',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#000080',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF00FF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTextOverlay;
