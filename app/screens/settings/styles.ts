import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
  },
  userImage: {
    marginTop: 16,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  userName: {
    marginTop: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'NanumMyeongjoBold',
    fontSize: 26,
    fontWeight: '600',
  },
  userEmail: {
    marginTop: Platform.OS === 'android' ? 0 : 4,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    fontWeight: '200',
  },
  subTitle: {
    marginTop: 28,
    marginBottom: 16,
    marginHorizontal: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: Platform.OS === 'android' ? 20 : 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  buttonBorder: {
    width: '31%',
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonIcon: {
    marginTop: 6,
  },
  buttonLabel: {
    marginTop: 4,
    marginBottom: Platform.OS === 'android' ? 8 : 3,
    color: 'white',
    fontFamily: 'Noto Sans KR Light',
    fontSize: 14,
    fontWeight: '400',
  },
  notificationsContainer: {
    marginHorizontal: 24,
  },
  notificationsContainerFooter: {
    paddingBottom: 24,
  },
});

export default styles;
