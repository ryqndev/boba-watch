import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( 
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
, document.getElementById('root'));
/**
 * Service worker is activated but doesn't do much other than default
 * react service worker code.
 * Things to be implemented: cache, indexdb, complete offline mode
 */
serviceWorker.register();
