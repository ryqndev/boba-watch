import { useState, useEffect } from 'react';
import lightTheme from '../../components/globals/themes/default.json';
import darkTheme from '../../components/globals/themes/dark.json';

const themeStyles = [lightTheme, darkTheme];

const THEME_SELECT_DEFAULT_VALUE = 0;
const THEME_SELECT_OPTIONS = [
    {
        'value': 0,
        'label': 'light'
    },
    {
        'value': 1,
        'label': 'dark'
    },
];

const THEMES = {
    'light': 0,
    'dark': 1,
}

const useTheme = () => {

    const getTheme = () => {

        return localStorage.getItem('theme') !== 'dark' ? 'light' : 'dark';
    }
    const [theme, setTheme] = useState(() => getTheme());

    useEffect(() => {
        localStorage.setItem('theme', theme);
        let styles = themeStyles[THEMES[theme]]?.themeStyles ?? [];
        for(let style in styles){
            document.documentElement.style.setProperty(style, styles[style]);
        }
    }, [theme]);

    return {
        theme,
        getTheme,
        setTheme,
        THEMES,
        THEME_SELECT_DEFAULT_VALUE,
        THEME_SELECT_OPTIONS,
    };
}

export default useTheme;
