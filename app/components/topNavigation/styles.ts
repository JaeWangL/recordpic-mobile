import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    color: 'white',
    fontFamily: 'NanumMyeongjoExtraBold',
    fontSize: 20,
    fontWeight: '700',
  },
  titleDarkLabel: {
    color: 'white',
    fontFamily: 'NanumMyeongjoExtraBold',
    fontSize: 20,
    fontWeight: '700',
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
    width: 48,
  },
});

export default styles;
