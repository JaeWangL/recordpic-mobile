import * as React from 'react';
import isEqual from 'react-fast-compare';
import { View, ViewStyle, StyleProp } from 'react-native';
import styles from './styles';

interface IDividerProps {
  inset?: boolean;
  isDarkMode?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Divider = (props: IDividerProps): React.ReactElement => {
  const { inset, isDarkMode, style, ...rest } = props;

  return <View {...rest} style={[isDarkMode ? styles.dark : styles.light, inset && styles.inset, style]} />;
};

Divider.defaultProps = {
  inset: false,
  isDarkMode: false,
  style: undefined,
};

export default React.memo(Divider, isEqual);
