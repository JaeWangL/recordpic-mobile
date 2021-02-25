import { Platform, StyleSheet } from 'react-native';
import { nanumMyeongjoBold, notoSans } from '@/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLabel: {
    marginTop: 0,
    textAlign: 'center',
    color: 'white',
    fontFamily: nanumMyeongjoBold,
    fontSize: 27,
  },
  descLabel: {
    marginTop: Platform.OS === 'android' ? -4 : 6,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: notoSans,
    fontSize: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 24,
  },
  headerTitle: {
    color: 'white',
    fontFamily: nanumMyeongjoBold,
    fontSize: 20,
  },
  headerChip: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 80,
    borderWidth: 1,
  },
  headerChipLabel: {
    color: 'white',
    fontFamily: notoSans,
    paddingTop: 6,
    paddingBottom: 8,
  },
  momentsContainer: {
    marginTop: 2,
  },
});

export default styles;
