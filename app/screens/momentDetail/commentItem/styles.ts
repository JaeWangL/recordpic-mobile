import { Platform, StyleSheet } from 'react-native';
import { notoSans, notoSansBold } from '@/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f3f3f3',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginTop: Platform.OS === 'android' ? -10 : 0,
  },
  topOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.OS === 'android' ? 32 : 18,
  },
  topInContainer: {
    flexDirection: 'row',
  },
  dateLabel: {
    marginTop: 0,
    color: '#777777',
    fontFamily: notoSans,
    fontSize: 13,
  },
  nameLabel: {
    marginRight: 6,
    color: '#222222',
    fontFamily: notoSansBold,
    fontSize: 14,
  },
  textLabel: {
    marginTop: Platform.OS === 'android' ? 0 : 7,
    color: '#222222',
    fontFamily: notoSans,
    fontSize: 14,
    lineHeight: Platform.OS === 'android' ? 32 : 18,
  },
  deleteLabel: {
    marginTop: -2,
    color: '#777777',
    fontFamily: notoSans,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

export default styles;
