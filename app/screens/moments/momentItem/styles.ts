import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 14,
  },
  lastItemContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 14,
    marginBottom: 100,
  },
  coverImageContainer: {
    width: 160,
    height: 120,
    // for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // for Android
    elevation: 5,
    backgroundColor: '#000',
  },
  countLabel: {
    position: 'absolute',
    textAlign: 'center',
    right: 0,
    bottom: 0,
    fontFamily: 'NanumMyeongjo',
    fontSize: 13,
    color: 'white',
    backgroundColor: 'black',
    width: 27,
    padding: 4,
    height: Platform.OS === 'android' ? 24 : 24,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    marginLeft: 28,
  },
  dateLabel: {
    marginTop: Platform.OS === 'android' ? 8 : 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
  },
  titleLabel: {
    marginTop: Platform.OS === 'android' ? 0 : 8,
    color: 'white',
    fontFamily: 'NanumMyeongjoExtraBold',
    fontSize: 20,
    lineHeight: 26,
  },
});

export default styles;
