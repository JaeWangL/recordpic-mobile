import { Platform, StyleSheet } from 'react-native';
import { placeholderGray200Color } from '@/styles';

const styles = StyleSheet.create({
  photoContainer: {
    marginTop: 12,
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
  chipContainer: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
  },
  photoChipRight: {
    marginLeft: 4,
  },
  photoChipLabel: {
    color: 'white',
    fontFamily: 'Noto Sans KR',
  },
  inputTitleContainer: {
    height: Platform.OS === 'android' ? 50 : 30,
    marginTop: Platform.OS === 'android' ? 16 : 24,
    marginHorizontal: '15%',
    backgroundColor: 'white',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 20,
    color: 'black',
  },
  inputDescContainer: {
    minHeight: Platform.OS === 'android' ? 40 : 56,
    marginTop: Platform.OS === 'android' ? -40 : -32,
    marginBottom: 42,
    marginHorizontal: '15%',
    backgroundColor: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 15,
    color: placeholderGray200Color,
  },
});

export default styles;
