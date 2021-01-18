import React from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export interface TopNavigationActionProps extends TouchableOpacityProps {
  iconName: string;
}

const TopNavigationAction: React.FC<TopNavigationActionProps> = (props) => {
  const { iconName, ...touchableProps } = props;

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
      <Icon style={{ paddingHorizontal: 12 }} name={iconName} size={20} />
    </TouchableOpacity>
  );
};

export default TopNavigationAction;
