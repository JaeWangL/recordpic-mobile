import React from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { baseBlackColor, baseWhiteColor } from '@/styles';
import styles from './styles';

export interface TopNavigationActionProps extends TouchableOpacityProps {
  iconName: string;
  darkBackground?: boolean;
}

const TopNavigationAction: React.FC<TopNavigationActionProps> = (props) => {
  const { darkBackground, iconName, ...touchableProps } = props;

  /*
  const getIconColor = (): string => {
    return darkBackground ? baseWhiteColor : baseBlackColor;
  };
  */

  const onPress = (event: GestureResponderEvent): void => {
    if (props.onPress) {
      props.onPress(event);
    }
  };

  const onPressIn = (event: GestureResponderEvent): void => {
    if (props.onPressIn) {
      props.onPressIn(event);
    }
  };

  const onPressOut = (event: GestureResponderEvent): void => {
    if (props.onPressOut) {
      props.onPressOut(event);
    }
  };

  return (
    <TouchableOpacity {...touchableProps} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Icon style={styles.icon} name={iconName} color={baseWhiteColor} size={24} />
    </TouchableOpacity>
  );
};

export default TopNavigationAction;
