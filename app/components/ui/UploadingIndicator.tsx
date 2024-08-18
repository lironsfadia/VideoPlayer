import { HStack } from './hstack';
import { Spinner } from './spinner';
import { Text } from './text';

const UploadingIndicator = () => {
  const UploadingIndicatorText = 'Please Wait...';
  return (
    <HStack space="sm" className="items-center mt-3">
      <Spinner color="$fuchsia600" />
      <Text className="text-md text-white">{UploadingIndicatorText}</Text>
    </HStack>
  );
};

export default UploadingIndicator;
