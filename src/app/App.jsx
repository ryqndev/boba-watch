import React, { useEffect, useState } from 'react';
import {MemoryRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import {Add, Edit} from './pages/Add';
import User from './pages/User/User';
import History from './pages/History';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Blog from './pages/Blog';
import { Navigation } from './components';
import Theme from './components/globals/theme';
import FirebaseUser from './controller/backend';

const Start = ({history}) => {
    useEffect(() => {
        Theme();
        FirebaseUser.init(user => {
            history.push(user ? '/app' : '/login');
        });
        console.log("v2.0.5");
    }, [history]);
    return (
        <Switch>
			<Route exact path='/'>
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/app'>
                <App />
			</Route>
		</Switch>
    );
}

const App = () => {
    const [user, setUser] = useState(false);
    return (
        <Router initialEntries={['/dash', '/history', '/add', '/feed', '/blog']} initialIndex={0}>
            <Switch>
                <Route exact path='/dash'>
                    <UserIcon setUser={setUser} />
                    <Dashboard /> 
                </Route>
                <Route exact path='/history'>
                    <UserIcon setUser={setUser} />
                    <History />
                </Route>
                <Route exact path='/add'>
                    <UserIcon setUser={setUser} />
                    <Add /> 
                </Route>
                <Route exact path='/edit/:userid'>
                    <UserIcon setUser={setUser} />
                    <Edit /> 
                </Route>
                <Route exact path='/feed'>
                    <Router initialEntries={['/popular', '/fave']} initialIndex={0}>
                        <Feed />
                    </Router>
                </Route>
                <Route exact path='/blog/:userid'>
                    <Blog/> 
                </Route>
            </Switch>
            <User open={user} setOpen={setUser} />
            <Navigation />
        </Router>
    );
}
const UserIcon = ({setUser}) => {
    return (
        <img 
            src={FirebaseUser.get.currentUser.user.photoURL}
            alt="user settings"
            className="avatar-button"
            onClick={setUser.bind(null, true)}
        />
    );
}

export default withRouter(Start);
