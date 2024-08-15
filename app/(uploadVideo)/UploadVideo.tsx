import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import useUploadVideo from './useUploadVideo';
import AnimatedDots from './ui/AnimatedDots';
import { View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';

const UploadVideo = () => {
  const { pickVideo, video, uploading, width, height, handleUpload } =
    useUploadVideo();
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
          Upload Your Rad Video
        </Text>
        {!video ? (
          <Button
            onPress={pickVideo}
            className="bg-fuchsia-500 p-5 rounded-md border-3 border-fuchsia-200"
          >
            <MaterialIcons name="videocam" size={50} color="#ffffff" />
            <ButtonText>Select Video</ButtonText>
          </Button>
        ) : (
          <VStack className="w-full mb-5">
            <Image
              source={{ uri: video }}
              className="w-full aspect-video rounded-md overflow-hidden mb-5 border-5 border-fuchsia-500"
              alt="Selected video thumbnail"
              resizeMode="cover"
            />
            <Button
              onPress={handleUpload}
              className="bg-fuchsia-500 p-5 rounded-md border-3 border-fuchsia-200"
            >
              <ButtonText className="text-white text-2xl font-bold">
                {uploading ? 'Uploading...' : 'Start Upload'}
              </ButtonText>
            </Button>
          </VStack>
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
