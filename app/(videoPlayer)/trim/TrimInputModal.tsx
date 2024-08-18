import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScaledSize,
} from 'react-native';

const TrimInputModal: React.FC<TrimInputModalProps> = ({
  onClose,
  onTrim,
  duration,
}) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [dimensions, setDimensions] = useState<ScaledSize>(
    Dimensions.get('window')
  );
  const [startTimeError, setStartTimeError] = useState<string>('');
  const [endTimeError, setEndTimeError] = useState<string>('');
  const endTimeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const validateInput = (): boolean => {
    let isValid = true;
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);

    if (isNaN(start) || start < 0) {
      setStartTimeError('Start time must be a non-negative number');
      isValid = false;
    } else if (start >= duration) {
      setStartTimeError('Start time must be less than video duration');
      isValid = false;
    } else {
      setStartTimeError('');
    }

    if (isNaN(end) || end <= 0) {
      setEndTimeError('End time must be a positive number');
      isValid = false;
    } else if (end > duration) {
      setEndTimeError('End time must not exceed video duration');
      isValid = false;
    } else if (end <= start) {
      setEndTimeError('End time must be greater than start time');
      isValid = false;
    } else {
      setEndTimeError('');
    }

    return isValid;
  };

  const handleTrim = async (): Promise<void> => {
    if (validateInput()) {
      onClose();
      await onTrim(parseFloat(startTime), parseFloat(endTime));
    }
  };

  const handleStartTimeSubmit = (): void => {
    endTimeInputRef.current?.focus();
  };

  const handleDonePress = (): void => {
    Keyboard.dismiss();
  };

  const isPortrait = dimensions.height > dimensions.width;

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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContainer, { width: dimensions.width }]}
          >
            <View
              style={[
                styles.modalContent,
                {
                  width: isPortrait
                    ? dimensions.width * 0.8
                    : dimensions.width * 0.5,
                  maxWidth: isPortrait ? 300 : 500,
                },
              ]}
            >
              <Text style={styles.title}>Trim Video</Text>
              <Text style={styles.label}>Start Time (seconds):</Text>
              <TextInput
                style={styles.input}
                value={startTime}
                onChangeText={setStartTime}
                keyboardType="numeric"
                placeholder="0.00"
                returnKeyType="next"
                onSubmitEditing={handleStartTimeSubmit}
              />
              {startTimeError ? (
                <Text style={styles.errorText}>{startTimeError}</Text>
              ) : null}
              <Text style={styles.label}>End Time (seconds):</Text>
              <TextInput
                ref={endTimeInputRef}
                style={styles.input}
                value={endTime}
                onChangeText={setEndTime}
                keyboardType="numeric"
                placeholder={duration.toFixed(2)}
                returnKeyType="done"
                onSubmitEditing={handleDonePress}
              />
              {endTimeError ? (
                <Text style={styles.errorText}>{endTimeError}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleDonePress}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTrim}>
                  <Text style={styles.buttonText}>Trim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#000080',
    padding: 20,
    borderRadius: 10,
    minHeight: 300,
    borderWidth: 2,
    borderColor: '#00FFFF',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#000080',
    width: '100%',
  },
  doneButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  doneButtonText: {
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#00FFFF',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF00FF',
  },
  buttonText: {
    color: '#000080',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default TrimInputModal;
