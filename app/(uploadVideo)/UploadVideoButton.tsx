import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import {
  ButtonSpinner,
  ButtonIcon,
  ButtonText,
} from '@/app/components/ui/button';
import { HStack } from '@/app/components/ui/hstack';
import { UploadVideoButtonProps } from './types';
import useUploadVideoButton from './useUploadVideoButton';

const UploadVideoButton = ({
  isUploading,
  video,
  videoName,
}: UploadVideoButtonProps) => {
  const buttonTitle = useUploadVideoButton({
    videoName,
    isUploading,
    video,
  });
  return (
    <HStack className="items-center mt-1">
      {isUploading ? (
        <ButtonSpinner color="white" />
      ) : (
        <ButtonIcon as={MaterialIcons} name="videocam" size={20} />
      )}
      {buttonTitle !== undefined && buttonTitle !== null && (
        <ButtonText
          className="font-large text-lg ml-1"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {buttonTitle}
        </ButtonText>
      )}
    </HStack>
  );
};

export default UploadVideoButton;
