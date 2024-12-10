import i18next from 'i18next';
import { createI18n } from 'i18next-vue';

i18next.init({
  lng: 'ar', // Default language
  fallbackLng: 'ar',
  resources: {
    ar: {
      translation: require('./locales/ar.json'),
    },
    fr: {
      translation: require('./locales/fr.json'),
    },
    en: {
      translation: require('./locales/en.json'),
    },
  },
});

export default createI18n(i18next);