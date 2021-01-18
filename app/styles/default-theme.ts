import { danger, info, primary, success, warning } from './colors';
import { ThemeType } from './types';

const DefaultTheme: ThemeType = {
  dark: false,
  colors: {
    primary,
    success,
    info,
    warning,
    danger,
  },
};

export default DefaultTheme;
