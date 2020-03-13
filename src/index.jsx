import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import App from './app';
import * as serviceWorker from './app/serviceWorker';
// import FirebaseUser from './app/controller/backend.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './app/theme';
import './app/components/globals/globals.scss';
import './i18n';

// try{
    ReactDOM.render( 
        <MuiThemeProvider theme={theme}>
            <Router
                basename={process.env.PUBLIC_URL}
                initialEntries={['/', '/login', '/app']}
                initialIndex={0}
            >
                <App />
            </Router>
        </MuiThemeProvider>
    , document.getElementById('root'));
// }
// catch{
//     FirebaseUser.logout();
// }

/**
 * Service worker is activated but doesn't do much other than default
 * react service worker code.
 * Things to be implemented: cache, indexdb, complete offline mode
 */
serviceWorker.unregister();
