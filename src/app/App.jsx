import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import User from './pages/User/User';
import History from './pages/History';
import Login from './pages/Login';
import {Navigation} from './components';
import FirebaseUser from './controller/backend';

const Start = ({history}) => {
    useEffect(() => {
		// Theme(SavedTheme());
        FirebaseUser.init(user => {
            history.push(user ? '/app' : '/login');
		});
		console.log("v2.0.1");
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
    const [drinkids, setDrinkids] = useState(FirebaseUser.get.currentUser.drinkids);
    useEffect(() => {
        console.log(drinkids);
    }, [drinkids]);
    return (
        <Router initialEntries={['/dash', '/history']} initialIndex={0}>
            <img 
                src={FirebaseUser.get.currentUser.user.photoURL}
                alt="user-settings"
                className="avatar-button"
                onClick={openUser}
            />
            <Switch>
                <Route exact path='/dash' >
                    <Dashboard /> 
                </Route>
                <Route exact path='/history'>
                    <History drinkids={drinkids} setDrinkids={setDrinkids}/>
                </Route>
            </Switch>
            <Add open={add} setOpen={setAdd} setDrinkids={setDrinkids}/>
            <User profile={FirebaseUser.get.currentUser.profile} open={user} setOpen={setUser} />
            <Navigation add={add} toggleAdd={() => {setAdd(!add)}} />
        </Router>
    );
}

export default withRouter(Start);
