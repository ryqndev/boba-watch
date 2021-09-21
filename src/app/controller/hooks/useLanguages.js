import { useTranslation } from 'react-i18next';
import { enUS, enGB, enAU, zhCN, zhTW } from 'date-fns/locale';

const useLanguages = () => {
    const { i18n } = useTranslation();

    const languageSelect = [
        { label: 'English', value: 'en' },
        { label: '繁體中文', value: 'zh-TW' }
    ];

    const languageMap = {
        'en': 0,
        'zh-TW': 1,
    }
    const localeMap = {
        'en': enUS,
        'en-US': enUS,
        'en-GB': enGB,
        'en-AU': enAU,
        'zh': zhTW,
        'zh-CN': zhCN,
        'zh-TW': zhTW,
    }

    const getSelectedLanguage = (languageCode) => languageSelect[languageMap[languageCode]];
    const getCurrentLocale = () => localeMap[i18n.language];
    const getCurrentLanguage = () => getSelectedLanguage(i18n.language);
    const setSelectedLanguage = ({ value }) => {
        i18n.changeLanguage(value);
    }
    return {
        languageSelect,
        getCurrentLanguage,
        getCurrentLocale,
        setSelectedLanguage,
    };
}

export default useLanguages;
