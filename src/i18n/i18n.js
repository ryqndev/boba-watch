import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import XHRBackend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

const detectOptions = {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: 'i18n',
    caches: ['localStorage'],
    checkWhitelist: true,
}

i18n
    .use(LanguageDetector)
    .use(XHRBackend)
    .use(initReactI18next)
    .init({
        detection: detectOptions,
        fallbackLng: "en",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;