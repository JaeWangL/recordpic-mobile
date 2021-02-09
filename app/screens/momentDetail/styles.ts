import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  dummyContainer: {
    paddingLeft: 28,
  },
  dateLabel: {
    paddingTop: 24,
    paddingBottom: 5,
    textAlign: 'center',
    color: '#777777',
    fontFamily: 'NanumMyeongjo',
    fontSize: 14,
  },
  nameLabel: {
    marginTop: Platform.OS === 'android' ? 0 : 2,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 20,
  },
  dropdownMenu: {
    paddingTop: 0,
    alignSelf: 'center',
  },
  listContainer: {
    backgroundColor: 'white',
  },
});

export default styles;
