import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingTop: 12,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 18,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  userImage: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textContainer: {
    marginLeft: 10,
  },
  dateLabel: {
    marginBottom: 1,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Noto Sans KR',
    fontSize: 12,
    lineHeight: Platform.OS === 'android' ? 18 : 18,
  },
  nameLabel: {
    color: 'white',
    fontFamily: 'Noto Sans KR Bold',
    fontSize: 14,
    lineHeight: Platform.OS === 'android' ? 20 : 20,
    letterSpacing: -0.1,
  },
  textLabel: {
    paddingRight: 38,
    color: 'white',
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    lineHeight: Platform.OS === 'android' ? 20 : 20,
    letterSpacing: -0.1,
  },
});

export default styles;
