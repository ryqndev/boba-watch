/**
 * @author Ryan Yang
 * https://github.com/ryqndev
 * 
 * @description Color theme toggle controller that uses local storage to 
 * save state and changes the theme with css variables.
 * 
 * @todo add color theme for specific days that require different themes 
 * that are time switched (i.e. red/green for holidays, etc.)
 */
import lightTheme from './themes/default.json';
import darkTheme from './themes/dark.json';

const themeStyles = [lightTheme, darkTheme];

const THEME_SELECT_DEFAULT_VALUE = 0;
const THEME_SELECT_OPTIONS = [
    {
        'value': 0,
        'label': 'default'
    },
    {
        'value': 1,
        'label': 'dark'
    },
];

/**
 * @function Theme - Loads saved theme storage and sets the theme. If no 
 * saved theme is found, defaults to 0.
 */
const Theme = () => { setTheme(getTheme()) }

/**
 * @function setTheme - Saves the selected theme value into localStorage 
 * and then sets the css variables to reflect change.
 * 
 * @param {Number} value - a 'value' specified in 
 * THEME_SELECT_OPTIONS. value also needs to be a valid index
 * in themeStyles
 */
const setTheme = (value) => {
    localStorage.setItem('theme', value);
    let styles = themeStyles[value].themeStyles;
    for(let style in styles){
        document.documentElement.style.setProperty(style, styles[style]);
    }
}

/**
 * @function getTheme - Gets and returns saved theme value from 
 * localStorage. If value is not found, returns 0.
 * 
 * @returns {Number} value stored in local storage or default 0 if none exists
 */
const getTheme = () => Number(localStorage.getItem('theme') ?? THEME_SELECT_DEFAULT_VALUE);

export default Theme;
export {
    setTheme,
    getTheme,
    THEME_SELECT_OPTIONS,
    THEME_SELECT_DEFAULT_VALUE,
}