import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import FirebaseUser from './components/firebaseCalls';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './i18n';
import './index.css';


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
