import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import en from './translations/en.json';
import enGB from './translations/en-gb.json';
import es from './translations/es.json';
import zh from './translations/zh.json';
import zhTW from './translations/zh-tw.json';

const resources = { 
    en: en,
    "en-US": en,
    "en-GB": enGB,
    es: es,
    zh: zh,
    "zh-TW": zhTW
};
const detectOptions = {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: 'i18n',
    caches: ['localStorage'],
    checkWhitelist: true
}

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    detection: detectOptions,
    fallbackLng: "en", 
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;