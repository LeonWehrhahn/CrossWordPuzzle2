import { Config } from "next-i18n-router/dist/types";

const i18nConfig : Config = {
  locales: ['en', 'de', 'ja'],
  defaultLocale: 'en',
  localeDetector(request, config) {
    //Get the language from the request route /de/
    const language = request.nextUrl.pathname.split('/')[1];
    if (config.locales.includes(language)) {
      return language;
    }
    return config.defaultLocale;
  },
};

export default i18nConfig;

export type Locale = (typeof i18nConfig)["locales"][number];
