/**
 * TODO: think about saving theme to firebase???
 */
import lightTheme from './themes/default.json';
import darkTheme from './themes/dark.json';

const themeStyles = [lightTheme, darkTheme];

const setp = (attr, val) => { document.documentElement.style.setProperty(attr, val) }

const getFromStorage = () => {
    let value = localStorage.getItem('theme');
    if(value === null || value.length === 0){
        return 0;
    }
    return Number(value);
}
const saveToStorage = (value) => {
    localStorage.setItem('theme', value);
}
const Theme = (dark) => {
    saveToStorage(dark);    
    setStyles(themeStyles[dark]);
}
const setStyles = (styles) => {
    for(let style in styles){
        setp(style, styles[style]);
    }
}
export default Theme;
export {
    getFromStorage as current,
    
}