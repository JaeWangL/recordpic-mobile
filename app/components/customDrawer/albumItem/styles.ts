import { Platform, StyleSheet } from 'react-native';
import { blackTransparent50Color, nanumMyeongjo, nanumMyeongjoExtraBold, notoSans } from '@/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: Platform.OS === 'android' ? 80 : 96,
    marginVertical: 16,
  },
  divider: {
    marginLeft: 0,
    width: 10,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleLabel: {
    alignSelf: 'center',
    marginTop: 34,
    color: 'white',
    fontFamily: nanumMyeongjoExtraBold,
    fontSize: 20,
  },
  descLabel: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? -6 : 0,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: notoSans,
    fontSize: 13,
  },
  albumImage: {
    alignSelf: 'center',
    width: '60%',
    height: 155,
    marginTop: Platform.OS === 'android' ? 2 : 10,
  },
  dateLabel: {
    alignSelf: 'center',
    marginTop: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: nanumMyeongjo,
    fontSize: 13,
  },
  createContainer: {
    height: 130,
    marginHorizontal: Platform.OS === 'android' ? 80 : 96,
    marginTop: 16,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTitle: {
    fontFamily: nanumMyeongjo,
    color: 'white',
    fontSize: 19,
  },
  createDesc: {
    color: blackTransparent50Color,
    fontSize: 13,
    marginTop: 5,
  },
});

export default styles;
