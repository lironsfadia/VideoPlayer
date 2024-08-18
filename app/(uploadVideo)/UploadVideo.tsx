import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/components/ui/button';
import useUploadVideo from './useUploadVideo';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { UPLOAD_BUTTON_TITLE } from './consts';
import { UploadVideoProps } from './types';
import Snow from '@/components/ui/Snow';

const UploadVideo = ({ onFinishUpload }: UploadVideoProps) => {
  const { pickVideo, video, uploading, handleUpload, videoName } =
    useUploadVideo({ onFinishUpload });

  const renderButtonContent = () => (
    <HStack className="items-center mt-1">
      {uploading ? (
        <ButtonSpinner color="white" />
      ) : (
        <ButtonIcon as={MaterialIcons} name="videocam" size={20} />
      )}
      <ButtonText
        className="font-large text-lg ml-1"
        color="$fuchsia500" // Matching text color with the icon
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {uploading
          ? 'Uploading...'
          : video
            ? `Start Upload: "${videoName}"`
            : 'Select Video'}
      </ButtonText>
    </HStack>
  );

  return (
    <View className="bg-blue-500 p-5">
      {Snow()}
      <VStack className="w-4/5 items-center">
        <Text className="text-4xl font-bold text-fuchsia-500 mb-8">
          {UPLOAD_BUTTON_TITLE}
        </Text>
        <ButtonGroup>
          <Button
            size="xl"
            onPress={video ? handleUpload : pickVideo}
            bg="$fuchsia500"
            borderColor="$fuchsia200"
            borderWidth={3}
            rounded="$md"
            p="$5"
          >
            {renderButtonContent()}
          </Button>
        </ButtonGroup>
        {uploading && (
          <HStack space="sm" className="items-center mt-3">
            <Spinner color="$fuchsia600" />
            <Text className="text-md text-white">Please Wait</Text>
          </HStack>
        )}
      </VStack>
    </View>
  );
};

export default UploadVideo;
