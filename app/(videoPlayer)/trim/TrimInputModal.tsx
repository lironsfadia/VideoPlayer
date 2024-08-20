import React from 'react';
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
import useTrimInputLogic from './UseTrimInputLogic';

interface TrimInputModalProps {
  onClose: () => void;
  onTrim: (startTime: number, endTime: number) => Promise<void>;
  duration: number;
}

const TrimInputModal: React.FC<TrimInputModalProps> = ({
  onClose,
  onTrim,
  duration,
}) => {
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    endTimeInputRef,
    handleTrim,
    handleStartTimeSubmit,
  } = useTrimInputLogic({ duration, onClose, onTrim });

  return (
    <Modal
      transparent={true}
      visible={true}
      onRequestClose={onClose}
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={startTime}
                onChangeText={setStartTime}
                keyboardType="numeric"
                placeholder="Start"
                returnKeyType="next"
                onSubmitEditing={handleStartTimeSubmit}
              />
              <Text style={styles.separator}>-</Text>
              <TextInput
                ref={endTimeInputRef}
                style={styles.input}
                value={endTime}
                onChangeText={setEndTime}
                keyboardType="numeric"
                placeholder="End"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <TouchableOpacity style={styles.trimButton} onPress={handleTrim}>
              <Text style={styles.trimButtonText}>Trim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
    paddingTop: 50, // Adjust this value to position the modal higher or lower
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
    width: 80,
    color: '#000080',
    textAlign: 'center',
  },
  separator: {
    color: '#FFFFFF',
    marginHorizontal: 5,
    fontSize: 18,
  },
  trimButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  trimButtonText: {
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
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrimInputModal;
