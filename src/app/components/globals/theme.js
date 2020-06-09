import lightTheme from './themes/default.json';
import darkTheme from './themes/dark.json';

const themeStyles = [lightTheme, darkTheme];

const setp = (attr, val) => { document.documentElement.style.setProperty(attr, val) }

const getFromStorage = () => Number(localStorage.getItem('theme') ?? 0);
const saveToStorage = (value) => { localStorage.setItem('theme', value) }

const Theme = (value) => {
    saveToStorage(value);    
    setStyles(themeStyles[value]);
}
const setStyles = (styles) => { for(let style in styles){ setp(style, styles[style]) } }

const themeSelectDefaultValue = 0;
const themeSelectOptions = [
    {
        'value': 0,
        'label': 'default'
    },
    {
        'value': 1,
        'label': 'dark'
    },
];

export default Theme;
export {
    getFromStorage as current,
    themeSelectOptions,
    themeSelectDefaultValue
}