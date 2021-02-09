import * as React from 'react';
import isEqual from 'react-fast-compare';
import { View, ViewStyle, StyleProp } from 'react-native';
import styles from './styles';

interface IDividerProps {
  inset?: boolean;
  isDarkMode?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<IDividerProps> = (props) => {
  const { inset, isDarkMode, style, ...rest } = props;

  return <View {...rest} style={[isDarkMode ? styles.dark : styles.light, inset && styles.inset, style]} />;
};

export default React.memo(Divider, isEqual);
