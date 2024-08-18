interface TrimInputModalProps {
  onClose: () => void;
  onTrim: (startTime: number, endTime: number) => Promise<void>;
  duration: number;
}
