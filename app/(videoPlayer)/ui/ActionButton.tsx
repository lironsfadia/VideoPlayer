import React from 'react';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { MaterialIcons } from '@expo/vector-icons';

interface ActionButtonProps {
  title: string;
  handlePress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
}

const ActionButton = ({ title, handlePress, iconName }: ActionButtonProps) => {
  return (
    <Button
      onPress={handlePress}
      variant="solid"
      size="md"
      className="flex-row items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
    >
      <ButtonIcon
        as={MaterialIcons}
        name={iconName}
        className="text-2xl mr-2 text-white"
      />
      <ButtonText className="text-white font-bold text-lg uppercase tracking-wider">
        {title}
      </ButtonText>
    </Button>
  );
};

export default ActionButton;
