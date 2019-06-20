import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import User from './components/User';
import History from './components/History';
import Login from './components/Login';
import stats from './components/calculateStatistics.js';
import Navigation from './Navigation';
import backend from './components/firebaseCalls';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        backend.init();
        backend.login.check( this.successfulLogin );
        
        this.state = {
            add: false,
            user: false,
            value: '',
            metrics: stats.getDefaultMetrics(),
        };
        this.update = React.createRef();
    }
    toggle = (item) => {
        this.setState(state => ({ [item]: !state[item] }));
        this.update.current.update();
    }
    handleChange = (event, value) => { this.setState({ value }) };
    successfulLogin = ( r ) => {
        if(localStorage.getItem('uid') !== r.user.uid){
            localStorage.clear();
            localStorage.setItem('uid', r.user.uid);
            localStorage.setItem( 'avatar', r.additionalUserInfo.profile.picture.data.url );
        }
        this.setState({ uid: r.user.uid, loggedIn: true });
        window.location.href = window.location.origin + '/#/dash';
    }
    render() {
        const s = this.state;
        return (
        <Router basename={process.env.PUBLIC_URL} >
            <Switch>
                <Route exact strict path='/' render={() => <Login successfulLogin={ this.successfulLogin }/> }/>
                <Route strict path='/:page' render={() => 
                    <div>
                        <div className="page">
                            <img 
                                src={localStorage.getItem('avatar')}
                                alt="user-settings"
                                className="avatar-button"
                                onClick={() => this.toggle('user')}
                            />
                            <Route exact path='/dash' render={() => 
                                <Dashboard ref={this.update} />
                            }/>
                            <Route exact path='/history' render={() => 
                                <History ref={this.update} />
                            }/>
                        </div>

                        <Add open={s.add} close={() => this.toggle('add')} />
                        <User open={s.user} close={() => this.toggle('user')} />

                        <Navigation value={s.value} handleChange={this.handleChange} toggleAdd={() => this.toggle('add')} />
                    </div>
                } />
                <Route render={() => <Login successfulLogin = { this.successfulLogin }/> }/>
            </Switch>
        </Router>
        );
    }
}

export default App;
