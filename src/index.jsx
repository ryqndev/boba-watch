import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
// import * as serviceWorker from './serviceWorker';
import './app/components/globals/globals.scss';
import './app/components/globals/lib-globals.scss';
import './app/components/globals/animations.scss';
import './i18n';

// try{
ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<App />
	</Router>,
	document.getElementById('root')
);
// }
// catch{
//     logout();
// }

/**
 * Service worker is activated but doesn't do much other than default
 * react service worker code.
 * Things to be implemented: cache, indexdb, complete offline mode
 */
// serviceWorker.register();
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`);
};
