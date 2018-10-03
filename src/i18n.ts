import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

import en from '../locales/en.json';
import fa from '../locales/fa.json';

I18n.defaultLocale = 'fa';
I18n.fallbacks = true;

I18n.translations = {
  fa,
  en,
};

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export const strings = (name: string, params = {}) => I18n.t(name, params);

export default I18n;
