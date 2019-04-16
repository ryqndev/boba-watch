import React, { Component } from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, Modal} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/AttachMoney';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import User from './components/User';
import History from './components/History';
import Login from './components/Login';
import stats from './components/calculateStatistics.js';
import theme from './theme';
import './App.css';

class App extends Component {
    state = {
        add: false,
        user: false,
        value: 'dash',
        userId: 1,
        accessToken: 0,
        metrics: stats.getDefaultMetrics()
    };
    toggleAdd = () => {
        this.setState(state => ({
            add: !state.add,
        }));
    }
    toggleUser = () => {
        this.setState(state => ({
            user: !state.user,
        }));
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    successfulLogin = (userid, fbRes) => {
        this.setState({
            userId: userid,
            accessToken: fbRes.accessToken,
            fbRes: fbRes
        });
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route exact strict path='/' render={() => <Login successfulLogin={ this.successfulLogin }/> }/>
                        <Route strict path='/:page' render={() => 
                            <div>
                                <div className="page">
                                    <img src={localStorage.getItem('avatar')} alt="user-settings" className="avatar-button" onClick={this.toggleUser} />
                                    <Route exact path='/dash' render={() => <Dashboard metrics={this}/>} />
                                    <Route path='/history' render={
                                        () => { return <History
                                                accessToken={ this.state.accessToken } 
                                                userId={ this.state.userId} />; 
                                            }
                                    } />
                                </div>
                                <Modal open={this.state.add} onBackdropClick={this.toggleAdd} >
                                    <div>
                                        <Add accessToken={this.state.accessToken} userId={this.state.userId} toggleSelf={this.toggleAdd}/>
                                    </div>
                                </Modal>
                                <Modal open={this.state.user} onBackdropClick={this.toggleUser} >
                                    <div>
                                        <User accessToken={this.state.accessToken} userId={this.state.userId}/>
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
                                        icon={ <div className="center-fab"> < AddIcon style={{ fontSize: 50 }}/></div> }
                                    />
                                    <BottomNavigationAction
                                        label="Spending"
                                        value="history"
                                        component={Link}
                                        to="/history"
                                        icon={<HistoryIcon />}
                                    />
                                </BottomNavigation>
                            </div>
                        } />
                        <Route render={() => <Login successfulLogin={ this.successfulLogin }/> }/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
