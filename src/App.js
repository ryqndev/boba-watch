import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, IconButton} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
// import AddIcon from './assets/add.svg';
import SettingsIcon from '@material-ui/icons/Settings';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Settings from './components/Settings';
import './App.css';

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
      MuiBottomNavigation: {
        root: {
            backgroundColor: '#FFAFA4',
        }
      },
      MuiBottomNavigationAction: {
        root: {
            color: '#000000',
        },
        iconOnly: {
            color: '#FF0000'
        },
        wrapper: {
            color: '#FFFFFF ',
        }
      }
    },
    typography: { useNextVariants: true },
});


class App extends Component {
    state = {
        value: 'dash',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <Router basename={process.env.PUBLIC_URL}>
                    <Route exact path='/dash' component={Dashboard} />
                    <Route path='/add' component={Add} />
                    <Route path='/settings' component={Settings} />
                    <BottomNavigation value={this.state.value} onChange={this.handleChange} className="bottom-nav">
                        <BottomNavigationAction 
                            label="Dashboard" 
                            value="dash" 
                            component={Link}
                            to="/dash"
                            icon={<DashboardIcon />}
                        />
                        <BottomNavigationAction 
                            // label="Add Drink"
                            value="add"
                            component={Link}
                            to="/add"
                            icon={<div className="center-fab"> < AddIcon style={{ fontSize: 50 }}/></div>}
                        />
                        <BottomNavigationAction
                            label="Settings"
                            value="settings"
                            component={Link}
                            to="/settings"
                            icon={<SettingsIcon />}
                        />
                    </BottomNavigation>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
