import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Add from './Add';
import User from './User';
import History from './History';
import Login from './Login';
import Navigation from './Navigation/Navigation';
import FirebaseUser from './firebaseCalls';
import './App.css';

const Start = ({history}) => {
    useEffect(() => {
		// Theme(SavedTheme());
        FirebaseUser.init( user => {
			history.push(user ? '/app' : '/login');
		});
		console.log("v2.0.0");
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
    const [add, setAdd] = useState(false);
    const [user, setUser] = useState(false), openUser = setUser.bind(null, true);
    const [value, setValue] = useState('');
    const handleChange = (e, value) => { setValue(value); };

    return (
        <Router initialEntries={['/dash', '/history']} initialIndex={0}>
            <img 
                src={FirebaseUser.get.user('avatar')}
                alt="user-settings"
                className="avatar-button"
                onClick={openUser}
            />
            <Switch>
                <Route exact path='/dash' >
                    <Dashboard /> 
                </Route>
                <Route exact path='/history'>
                    <History />
                </Route>
            </Switch>
            <Add open={add} setOpen={setAdd} />
            <User open={user} setOpen={setUser} />
            <Navigation value={value} handleChange={handleChange} toggleAdd={() => {setAdd(!add); }} />
        </Router>
    );
}

export default withRouter(Start);
