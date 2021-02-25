import { Platform, StyleSheet } from 'react-native';
import { gray300Color, notoSans, notoSansBold } from '@/styles';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    paddingBottom: 16,
  },
  contentContainer: {
    marginHorizontal: 24,
  },
  modalTitle: {
    paddingTop: 36,
    textAlign: 'center',
    fontFamily: notoSansBold,
    fontSize: 18,
  },
  modalDesc: {
    textAlign: 'center',
    color: gray300Color,
    fontFamily: notoSans,
    fontSize: 15,
  },
  inputCodeContainer: {
    marginTop: 0,
    paddingBottom: Platform.OS === 'android' ? 0 : 16,
    backgroundColor: 'transparent',
    fontFamily: notoSans,
    fontSize: 18,
    textAlign: 'center',
    height: 50,
  },
  buttonJoin: {
    marginTop: 44,
    borderRadius: 0,
    backgroundColor: '#222222',
  },
  buttonJoinLabel: {
    marginVertical: Platform.OS === 'android' ? 4 : 8,
    color: 'white',
    fontFamily: notoSans,
    fontSize: 17,
    letterSpacing: -0.1,
  },
  buttonCreate: {
    marginTop: 6,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
  buttonCreateLabel: {
    marginVertical: Platform.OS === 'android' ? 4 : 8,
    color: 'black',
    fontFamily: notoSans,
    fontSize: 17,
    letterSpacing: -0.1,
  },
  closeLabel: {
    marginVertical: Platform.OS === 'android' ? 12 : 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: notoSans,
    fontSize: 16,
    color: '#999999',
  },
});

export default styles;
