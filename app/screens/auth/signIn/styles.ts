import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    minHeight: 216,
  },
  headerText: {
    color: 'white',
    fontFamily: 'NanumMyeongjo',
    fontSize: 23,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 48,
  },
  googleLogo: {
    marginLeft: -24,
  },
  googleLabel: {
    paddingLeft: 12,
    marginVertical: Platform.OS === 'android' ? 2 : 14,
    color: 'black',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
});

export default styles;
