import React from 'react';
import { View } from 'react-native';
import { Button, ButtonGroup } from '@/app/components/ui/button';
import Snow from '@/app/components/ui/Snow';
import { VStack } from '@/app/components/ui/vstack';
import { Text } from '@/app/components/ui/text';
import useUploadVideo from './useUploadVideo';
import { UPLOAD_BUTTON_TITLE } from './consts';
import { UploadVideoProps } from './types';
import UploadingIndicator from '@/app/components/ui/UploadingIndicator';
import UploadVideoButton from './UploadVideoButton';

const UploadVideo = ({ onFinishUpload }: UploadVideoProps) => {
  const { pickVideo, video, uploading, handleUpload, videoName } =
    useUploadVideo({ onFinishUpload });

  return (
    <View className="bg-blue-500 p-5">
      <VStack className="w-4/9 items-center">
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
            <UploadVideoButton
              isUploading={uploading}
              video={video}
              videoName={videoName}
            />
          </Button>
        </ButtonGroup>
        {uploading && <UploadingIndicator />}
      </VStack>
    </View>
  );
};

export default UploadVideo;
