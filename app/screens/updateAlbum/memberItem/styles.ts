import { Platform, StyleSheet } from 'react-native';
import { baseBlackColor, blackTransparent50Color } from '@/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: baseBlackColor,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  nameLabel: {
    marginTop: Platform.OS === 'android' ? -8 : 0,
    marginRight: 6,
    color: 'white',
    fontFamily: 'Noto Sans KR Bold',
    fontSize: 14,
  },
  emailLabel: {
    marginTop: Platform.OS === 'android' ? -8 : 0,
    color: blackTransparent50Color,
    fontFamily: 'Noto Sans KR',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default styles;
