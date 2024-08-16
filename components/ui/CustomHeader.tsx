import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const CustomHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackPress = () => {
    router.back();
  };

  if (pathname === '/' || pathname === '/index') {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handleBackPress}
      className="absolute top-4 left-4 z-10 p-2 "
    >
      <MaterialIcons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomHeader;
