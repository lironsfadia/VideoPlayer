import { Dimensions } from 'react-native';

export const getScreenDimensions = (): { width: number; height: number } => {
  return Dimensions.get('window');
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveOverlays = async (videoId, overlays) => {
  try {
    const key = `overlays_${videoId}`;
    await AsyncStorage.setItem(key, JSON.stringify(overlays));
    console.log('Overlays saved:', overlays);
  } catch (error) {
    console.error('Error saving overlays:', error);
  }
};

export const loadOverlays = async (videoId) => {
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
