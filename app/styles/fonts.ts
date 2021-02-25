import { Platform } from 'react-native';

export const nanumMyeongjo = Platform.OS === 'ios' ? 'NanumMyeongjo' : 'NanumMyeongjo-Regular';
export const nanumMyeongjoBold = Platform.OS === 'ios' ? 'NanumMyeongjoBold' : 'NanumMyeongjo-Bold';
export const nanumMyeongjoExtraBold = Platform.OS === 'ios' ? 'NanumMyeongjoExtraBold' : 'NanumMyeongjo-ExtraBold';
export const notoSans = Platform.OS === 'ios' ? 'Noto Sans KR' : 'NotoSansKR-Regular';
export const notoSansLight = Platform.OS === 'ios' ? 'Noto Sans KR Light' : 'NotoSansKR-Light';
export const notoSansBold = Platform.OS === 'ios' ? 'Noto Sans KR Bold' : 'NotoSansKR-Bold';
