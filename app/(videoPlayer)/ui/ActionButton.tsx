import { Button } from '@/components/ui/button';
import React from 'react';

interface ActionButtonProps {
  title: string;
  handlePress: () => void;
}

const ActionButton = ({ title, handlePress }: ActionButtonProps ) => {
  return <Button title={title} onPress={handlePress} />;
};

export default ActionButton;