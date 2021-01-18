import { TranslateOptions } from 'i18n-js';
import I18n from './i18n';

export const translate = (key: string): string => {
  return key ? I18n.t(key) : '';
};

export const translateWithVars = (key: string, options: TranslateOptions): string => {
  return key ? I18n.t(key, options) : '';
};
