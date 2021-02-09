import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    minHeight: 116,
  },
  headerText: {
    color: 'white',
    fontFamily: 'NanumMyeongjo',
    fontSize: 23,
  },
  formContainer: {
    marginHorizontal: 24,
    marginBottom: '35%',
  },
  formText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: '400',
  },
  inputCodeContainer: {
    marginTop: 24,
    marginHorizontal: 24,
    color: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginBottom: 48,
  },
  buttonJoin: {
    borderRadius: 0,
    backgroundColor: 'white',
    marginVertical: 4,
  },
  buttonJoinLabel: {
    marginVertical: Platform.OS === 'android' ? 2 : 8,
    color: 'black',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  buttonCreate: {
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'transparent',
    marginVertical: 4,
  },
  buttonCreateLabel: {
    marginVertical: Platform.OS === 'android' ? 2 : 8,
    color: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
});

export default styles;
