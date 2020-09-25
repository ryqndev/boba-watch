import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import App from './app';
import * as serviceWorker from './app/serviceWorker';
import './app/components/globals/globals.scss';
import './app/components/globals/lib-globals.scss';
import './app/components/globals/animations.scss';
import './i18n';
import { logout } from './app/libs/firestore';

try{
    ReactDOM.render( 
        <Router
            basename={process.env.PUBLIC_URL}
            initialEntries={['/', '/login', '/app']}
            initialIndex={0}
        >
            <App />
        </Router>
    , document.getElementById('root'));
}
catch{
    logout();
}

/**
 * Service worker is activated but doesn't do much other than default
 * react service worker code.
 * Things to be implemented: cache, indexdb, complete offline mode
 */
serviceWorker.register();
