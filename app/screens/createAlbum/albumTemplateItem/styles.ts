import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 3,
  },
  divider: {
    marginLeft: 0,
    width: 10,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleLabel: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 36,
    color: 'white',
    fontFamily: Platform.OS === 'android' ? 'NanumMyeongjoBold' : 'NanumMyeongjo',
    fontSize: 20,
    fontWeight: '600',
  },
  descLabel: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 2 : 6,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  albumImage: {
    alignSelf: 'center',
    width: '70%',
    height: 150,
    marginTop: Platform.OS === 'android' ? 12 : 18,
  },
  dateLabel: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'NanumMyeongjo',
    fontSize: 13,
  },
});

export default styles;
