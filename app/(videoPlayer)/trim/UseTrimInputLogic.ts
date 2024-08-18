import { useState, useRef, useEffect, useCallback } from 'react';
import { TextInput, Dimensions, ScaledSize, Keyboard } from 'react-native';

interface UseTrimInputLogicProps {
  onClose: () => void;
  onTrim: (startTime: number, endTime: number) => Promise<void>;
  duration: number;
}

const useTrimInputLogic = ({
  onClose,
  onTrim,
  duration,
}: UseTrimInputLogicProps) => {
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

  const validateInput = useCallback((): boolean => {
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
  }, [startTime, endTime, duration]);

  const handleTrim = useCallback(async (): Promise<void> => {
    if (validateInput()) {
      onClose();
      await onTrim(parseFloat(startTime), parseFloat(endTime));
    }
  }, [validateInput, onClose, onTrim, startTime, endTime]);

  const handleStartTimeSubmit = useCallback((): void => {
    endTimeInputRef.current?.focus();
  }, []);

  const handleDonePress = useCallback((): void => {
    Keyboard.dismiss();
  }, []);

  const isPortrait = dimensions.height > dimensions.width;

  return {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    dimensions,
    startTimeError,
    endTimeError,
    endTimeInputRef,
    isPortrait,
    handleTrim,
    handleStartTimeSubmit,
    handleDonePress,
    duration,
  };
};

export default useTrimInputLogic;
