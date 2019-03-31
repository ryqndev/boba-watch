import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, Modal} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/AttachMoney';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import history from './components/History';
import Login from './components/Login';
import './App.css';

const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        text: {
          backgroundColor: '#F68080',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 30,
          padding: '0 30px',
          margin: '20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 14
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
    MuiPickers: {
        root: {
            backgroundColor: '#FFAFA4'
        },
    },
    MuiCard: {
        root: {
            backgroundColor: '#FFAFA4'
        }
    },
    typography: {
        useNextVariants: true,
        h2: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: 48,
            margin: 0
        },
        h3: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: '#F68080',
            fontSize: 24,
            marginBottom: '16px'
        },
        h4: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: 'white',
            fontSize: 24,
        },
        h5: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: 'black',
            fontSize: 18,
        },
        h6: {
            fontFamily: 'Poppins',
            color: '#F68080',
            fontSize: 12,
        }
    },
});


class App extends Component {
    state = {
        add: false,
        user: false,
        value: 'dash',
    };
    toggleAdd = () => {
        this.setState(state => ({
            add: !state.add,
        }));
    }
    toggleUser = () => {
        this.setState(state => ({
            add: !state.user,
        }));
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="page">
                        <Route exact path='/dash' component={Dashboard} />
                        <Route path='/history' component={history} />
                        <Route exact path='/' component={Login} />
                    </div>
                    <Modal open={this.state.add} onBackdropClick={this.toggleAdd} >
                        <div>
                            <Add toggleSelf={this.toggleAdd}/>
                        </div>
                    </Modal>
                    <Modal open={this.state.user} onBackdropClick={this.toggleUser} >
                        <div>
                            <Add />
                        </div>
                    </Modal>
                    <BottomNavigation value={this.state.value} onChange={this.handleChange} className="bottom-nav">
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dash"
                            component={Link}
                            to="/dash"
                            icon={<DashboardIcon />}
                        />
                        <BottomNavigationAction
                            value="add"
                            disableRipple={true}
                            onClick={this.toggleAdd}
                            onClose={this.refocus}
                            icon={<div className="center-fab"> < AddIcon style={{ fontSize: 50 }}/></div>}
                        />
                        <BottomNavigationAction
                            label="Spending"
                            value="history"
                            component={Link}
                            to="/history"
                            icon={<HistoryIcon />}
                        />
                    </BottomNavigation>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
