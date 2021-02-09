import { Platform, StyleSheet } from 'react-native';
import { placeholderGray200Color } from '@/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: Platform.OS === 'android' ? 30 : 24,
  },
  firstContainer: {
    backgroundColor: 'white',
    marginTop: Platform.OS === 'android' ? 8 : 16,
  },
  photoLeft: {
    height: 250,
    width: '100%',
  },
  photoRight: {
    alignSelf: 'flex-end',
    height: 250,
    width: '100%',
  },
  titleLabel: {
    marginTop: 24,
    marginBottom: Platform.OS === 'android' ? -2 : 6,
    marginHorizontal: '15%',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 20,
  },
  descLabel: {
    marginHorizontal: '15%',
    color: placeholderGray200Color,
    fontFamily: 'Noto Sans KR',
    fontSize: 15,
    marginBottom: 36,
  },
});

export default styles;
