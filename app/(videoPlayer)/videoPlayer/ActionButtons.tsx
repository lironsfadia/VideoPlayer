import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import ActionButton from '../ui/ActionButton';
import { ActionButtonsProps } from './types';

const ActionButtons: React.FC<ActionButtonsProps> = React.memo(
  ({
    onAddTextOverlay,
    onTrimPress,
    onSavePress,
    disableAddText,
    disableSave,
    disableTrim,
  }) => (
    <View style={styles.buttonContainer}>
      <ActionButton
        title="Add Text"
        handlePress={onAddTextOverlay}
        iconName={'text-format'}
        disabled={disableAddText}
      />
      <ActionButton
        title="Trim"
        handlePress={onTrimPress}
        iconName={'content-cut'}
        disabled={disableTrim}
      />
      <ActionButton
        title="Save Effects"
        handlePress={onSavePress}
        iconName={'save'}
        disabled={false}
      />
    </View>
  )
);

export default ActionButtons;
