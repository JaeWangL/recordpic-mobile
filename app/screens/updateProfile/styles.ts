import { Platform, StyleSheet } from 'react-native';
import { baseBlackColor, nanumMyeongjo, notoSans } from '@/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseBlackColor,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 0,
    marginHorizontal: 24,
    minHeight: 216,
  },
  userImageContainer: {
    marginTop: 16,
  },
  userImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  inputNameContainer: {
    marginTop: 12,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: notoSans,
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
    height: 50,
  },
  signout: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: notoSans,
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 48,
  },
  buttonBack: {
    width: '30%',
    marginRight: 4,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  buttonBackLabel: {
    marginVertical: Platform.OS === 'android' ? 4 : 8,
    color: 'white',
    fontFamily: notoSans,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  buttonCreate: {
    width: '70%',
    marginLeft: 4,
    borderRadius: 0,
    backgroundColor: 'white',
  },
  buttonCreateLabel: {
    marginVertical: Platform.OS === 'android' ? 4 : 8,
    color: 'black',
    fontFamily: notoSans,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
});

export default styles;
