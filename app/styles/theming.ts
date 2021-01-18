import { createTheming } from '@callstack/react-theme-provider';
import DefaultTheme from './default-theme';
import { ThemeType } from './types';

export const { ThemeProvider, withTheme, useTheme } = createTheming<ThemeType>(DefaultTheme);
