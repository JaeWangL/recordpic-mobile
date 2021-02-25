import { Platform, StyleSheet } from 'react-native';
import { dividerGrayColor, placeholderGray200Color } from './colors';

export const photoListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? 12 : 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: {
    marginTop: 30,
    paddingBottom: 5,
    color: '#777777',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 14,
  },
  dateArrow: {
    marginTop: 24,
    marginLeft: 4,
  },
  inputNameContainer: {
    marginTop: Platform.OS === 'android' ? -7 : 6,
    textAlign: 'center',
    backgroundColor: 'white',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 20,
  },
  listContainer: {
    backgroundColor: 'white',
  },
  listContentContainer: {
    paddingBottom: 550,
  },
  footerDivider: {
    marginTop: 24,
    color: dividerGrayColor,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerLabel: {
    marginTop: 8,
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 15,
  },
});

export const photoParamsStyles = StyleSheet.create({
  photoContainer: {
    marginTop: 12,
  },
  photoRight: {
    alignSelf: 'flex-end',
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
    marginTop: Platform.OS === 'android' ? -48 : -32,
    marginBottom: 42,
    marginHorizontal: '14%',
    backgroundColor: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 15,
    color: placeholderGray200Color,
  },
});
