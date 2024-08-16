import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import useUploadVideo from './useUploadVideo';
import AnimatedDots from '../../components/ui/AnimatedDots';
import { View } from 'react-native';
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { UPLOAD_BUTTON_TITLE } from './consts';

const UploadVideo = ({ onFinishUpload }) => {
  const {
    pickVideo,
    video,
    uploading,
    width,
    height,
    handleUpload,
    videoName,
  } = useUploadVideo(onFinishUpload);
  const dots = Array(50)
    .fill(0)
    .map((_, i) => (
      <AnimatedDots
        key={i}
        startPos={{ x: Math.random() * width, y: Math.random() * height }}
      />
    ));

  return (
    <View className="bg-blue-500 p-5">
      {dots}
      <VStack className="w-4/5 items-center">
        <Text className="text-4xl font-bold text-fuchsia-500 mb-8">
          {UPLOAD_BUTTON_TITLE}{' '}
        </Text>
        {!video ? (
          <ButtonGroup>
            <Button
              size="xl"
              onPress={pickVideo}
              bg="$fuchsia500"
              borderColor="$fuchsia200"
              borderWidth={3}
              rounded="$md"
              p="$5"
            >
              {uploading ? (
                <ButtonSpinner color="$white" />
              ) : (
                <ButtonIcon
                  as={MaterialIcons}
                  name="videocam"
                  size="2xl"
                  mr="$2"
                />
              )}
              <ButtonText
                className="font-large text-lg ml-1 text-fuchsia-500"
                color="$white"
              >
                Select Video
              </ButtonText>
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button
              size="xl"
              onPress={handleUpload}
              bg="$fuchsia500"
              borderColor="$fuchsia200"
              borderWidth={3}
              rounded="$md"
              p="$5"
            >
              {uploading ? (
                <ButtonSpinner color="$white" />
              ) : (
                <ButtonIcon
                  as={MaterialIcons}
                  name="videocam"
                  size="2xl"
                  mr="$2"
                />
              )}
              <ButtonText
                className="font-large text-lg ml-1 text-fuchsia-500"
                color="$white"
              >
                {uploading ? 'Uploading...' : `Start Upload: "${videoName}"`}
              </ButtonText>
            </Button>
          </ButtonGroup>
        )}
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
