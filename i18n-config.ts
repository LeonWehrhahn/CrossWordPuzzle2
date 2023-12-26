import { Config } from 'next-i18n-router/dist/types';

export const i18nConfig : Config = {
  locales: ['en', 'de', 'ja'],
  defaultLocale: 'en',
  prefixDefault: false,
  basePath: '/',
};

export type Locale = (typeof i18nConfig)["locales"][number];
