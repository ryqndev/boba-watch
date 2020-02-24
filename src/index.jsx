import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MemoryRouter as Router} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './components/App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import FirebaseUser from './components/firebaseCalls';

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
