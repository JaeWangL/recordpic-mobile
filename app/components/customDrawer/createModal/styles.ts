import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: '5%',
    paddingBottom: 16,
  },
  modalTitle: {
    paddingTop: 36,
    textAlign: 'center',
    fontFamily: 'Noto Sans KR Bold',
    fontSize: 18,
  },
  modalDesc: {
    marginTop: -8,
    textAlign: 'center',
    color: '#555555',
    fontFamily: 'Noto Sans KR',
    fontSize: 15,
  },
  inputCodeContainer: {
    marginTop: 0,
    marginHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 0 : 16,
    backgroundColor: 'transparent',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    height: 50,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 2,
  },
  buttonJoin: {
    marginTop: 44,
    marginHorizontal: 24,
    borderRadius: 0,
    backgroundColor: '#222222',
  },
  buttonJoinLabel: {
    marginVertical: Platform.OS === 'android' ? 0 : 12,
    color: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  buttonCreate: {
    marginTop: 6,
    marginHorizontal: 24,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
  buttonCreateLabel: {
    marginVertical: Platform.OS === 'android' ? 0 : 12,
    color: 'black',
    fontFamily: 'Noto Sans KR',
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  closeLabel: {
    marginVertical: Platform.OS === 'android' ? 12 : 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Noto Sans KR',
    fontSize: 16,
    color: '#999999',
  },
});

export default styles;
