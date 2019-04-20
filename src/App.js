import React, { Component } from 'react';
import {MemoryRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, Modal} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/AttachMoney';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import User from './components/User';
import History from './components/History';
import Login from './components/Login';
import stats from './components/calculateStatistics.js';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            add: false,
            user: false,
            value: '',
            userId: 1,
            accessToken: 0,
            metrics: stats.getDefaultMetrics()
        };
        this.update = React.createRef();
    }
    toggleAdd = () => {
        this.setState(state => ({
            add: !state.add,
        }));
        this.update.current.update();
    }
    toggleUser = () => {
        this.setState(state => ({
            user: !state.user,
        }));
        this.update.current.update();
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
        <Router basename={process.env.PUBLIC_URL} initialEntries={['/', '/dash', '/history']} initialIndex={0}>
            <Switch>
                <Route exact strict path='/' render={() => <Login successfulLogin={ this.successfulLogin }/> }/>
                <Route strict path='/:page' render={() => 
                    <div>
                        <div className="page">
                            <img src={localStorage.getItem('avatar')} alt="user-settings" className="avatar-button" onClick={this.toggleUser} />
                            <Route exact path='/dash' render={() => 
                                <Dashboard userId={this.state.userId} accessToken={this.state.accessToken} metrics={this} ref={this.update}/>
                            }/>
                            <Route exact path='/history' render={() => 
                                <History accessToken={ this.state.accessToken } userId={ this.state.userId} ref={this.update}/>
                            }/>
                        </div>
                        <Modal open={this.state.add}>
                            <div>
                                <Add accessToken={this.state.accessToken} userId={this.state.userId} close={this.toggleAdd}/>
                            </div>
                        </Modal>
                        <Modal open={this.state.user} >
                            <div>
                                <User accessToken={this.state.accessToken} userId={this.state.userId} close={this.toggleUser}/>
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
        );
    }
}

export default App;
