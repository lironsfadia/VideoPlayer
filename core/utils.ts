import { Dimensions } from 'react-native';

export const getScreenDimensions = (): { width: number; height: number } => {
  return Dimensions.get('window');
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextOverlay } from '@/app/(videoPlayer)/videoPlayer/types';

export const saveOverlays = async (
  videoId: string,
  overlays: TextOverlay[]
) => {
  try {
    const key = `overlays_${videoId}`;
    await AsyncStorage.setItem(key, JSON.stringify(overlays));
    console.log('Overlays saved:', overlays);
  } catch (error) {
    console.error('Error saving overlays:', error);
  }
};

export const loadOverlays = async (videoId: string) => {
  try {
    const key = `overlays_${videoId}`;
    console.log('Loading overlays:', key);
    const savedOverlays = await AsyncStorage.getItem(key);
    console.log('Overlays loaded:', savedOverlays);
    return savedOverlays ? JSON.parse(savedOverlays) : null;
  } catch (error) {
    console.error('Error loading overlays:', error);
    return null;
  }
};
