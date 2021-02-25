import { Platform, StyleSheet } from 'react-native';
import { nanumMyeongjoExtraBold } from '@/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingBottom: 12,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    color: 'white',
    fontFamily: nanumMyeongjoExtraBold,
    fontSize: 20,
    paddingBottom: Platform.OS === 'android' ? 0 : 12,
  },
  titleDarkLabel: {
    color: 'white',
    fontFamily: nanumMyeongjoExtraBold,
    fontSize: 20,
  },
  subtitleLabel: {
    color: 'white',
  },
  subtitleDarkLabel: {},
  leftControlContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  rightControlsContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  spacing: {
    width: Platform.OS === 'android' ? 76 : 48,
  },
});

export default styles;
