import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "language_setting": "Language",
      "location_setting": "Location",
      "restaurant": "Restaurant",
      "guide": "Guide"
    }
  },
  ko: {
    translation: {
      "language_setting": "언어설정",
      "location_setting": "위치설정",
      "restaurant": "맛집",
      "guide": "사용법"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
