import { Platform, StyleSheet } from 'react-native';
import { dividerGrayColor } from '@/styles';

const styles = StyleSheet.create({
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

export default styles;
