import { StyleSheet } from 'react-native';
import { dividerDarkColor, dividerWhiteColor } from '@/configs';

const styles = StyleSheet.create({
  light: {
    backgroundColor: dividerDarkColor,
    height: StyleSheet.hairlineWidth,
  },
  dark: {
    backgroundColor: dividerWhiteColor,
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});

export default styles;
