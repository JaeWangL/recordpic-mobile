import { Platform, StyleSheet } from 'react-native';
import { baseBlackColor, baseWhiteColor, notoSans } from '@/styles';

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 0 : 12,
    fontFamily: notoSans,
    fontSize: 14,
    color: baseBlackColor,
  },
  textDark: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 0 : 12,
    fontFamily: notoSans,
    fontSize: 14,
    color: baseWhiteColor,
  },
});

export default styles;
