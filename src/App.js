import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        text: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          margin: '20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
    typography: { useNextVariants: true },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Button> Boba Watch </Button>
            </MuiThemeProvider>
        );
    }
}

export default App;
