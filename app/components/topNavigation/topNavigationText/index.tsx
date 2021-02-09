import React from 'react';
import { GestureResponderEvent, TextProps } from 'react-native';
import { Text } from 'react-native-ui-lib';
import styles from './styles';

export interface TopNavigationTextProps extends TextProps {
  label: string;
  darkBackground?: boolean;
}

const TopNavigationText = (props: TopNavigationTextProps): React.ReactElement => {
  const { darkBackground, label, onPress, ...textProps } = props;

  const onTextPress = (event: GestureResponderEvent): void => {
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <Text
      {...textProps}
      style={styles.textDark /* darkBackground ? styles.textDark : styles.text */}
      onPress={onTextPress}
    >
      {label}
    </Text>
  );
};

export default TopNavigationText;
