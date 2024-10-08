import React from 'react';
import { Button, ButtonText } from '@/app/components/ui/button';

interface ActionButtonProps {
  title: string;
  handlePress: (...args: any) => void;
  disabled?: boolean;
  iconName?: string;
}

const ActionButton = ({
  title,
  handlePress,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <Button
      disabled={disabled}
      onPress={handlePress}
      variant="solid"
      size="lg"
      className="flex-row items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
    >
      <ButtonText className="text-white font-bold text-lg uppercase tracking-wider">
        {title}
      </ButtonText>
    </Button>
  );
};

export default ActionButton;
