import { Dimensions } from 'react-native';

export const getScreenDimensions = (): { width: number; height: number } => {
  return Dimensions.get('window');
};
