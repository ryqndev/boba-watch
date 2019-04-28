import React, { Component } from 'react';
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import User from './components/User';
import History from './components/History';
import Login from './components/Login';
import stats from './components/calculateStatistics.js';
import Navigation from './Navigation';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        // const isIos = () => {
        //     const userAgent = window.navigator.userAgent.toLowerCase();
        //     return /iphone|ipad|ipod/.test( userAgent );
        // }
        // const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);        
        // if (isIos() && !isInStandaloneMode()) {
        //     /**
        //      * TODO: Prompt user for adding on safari
        //      */
        // }
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
    toggle = (item) => {
        this.setState(state => ({
            [item]: !state[item],
        }));
        this.update.current.update();
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
                            <img src={localStorage.getItem('avatar')} alt="user-settings" className="avatar-button" onClick={() => this.toggle('user')} />
                            <Route exact path='/dash' render={() => 
                                <Dashboard userId={this.state.userId} accessToken={this.state.accessToken} metrics={this} ref={this.update}/>
                            }/>
                            <Route exact path='/history' render={() => 
                                <History accessToken={ this.state.accessToken } userId={this.state.userId} ref={this.update}/>
                            }/>
                        </div>
                        <Add open={this.state.add} accessToken={this.state.accessToken} userId={this.state.userId} close={() => this.toggle('add')}/>
                        <User open={this.state.user} accessToken={this.state.accessToken} userId={this.state.userId} close={() => this.toggle('user')}/>
                        <Navigation value={this.state.value} handleChange={this.handleChange} toggleAdd={() => this.toggle('add')}/>
                    </div>
                } />
                <Route render={() => <Login successfulLogin={ this.successfulLogin }/> }/>
            </Switch>
        </Router>
        );
    }
}

export default App;
