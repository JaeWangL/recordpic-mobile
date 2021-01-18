import DefaultTheme from './default-theme';
import { ThemeType } from './types';

const DarkTheme: ThemeType = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default DarkTheme;
