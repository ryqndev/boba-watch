import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import User from './pages/User/User';
import History from './pages/History';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Blog from './pages/Blog';
import {Navigation} from './components';
import FirebaseUser from './controller/backend';

const Start = ({history}) => {
    useEffect(() => {
		// Theme(SavedTheme());
        FirebaseUser.init(user => {
            history.push(user ? '/app' : '/login');
        });
		console.log("v2.0.2");
    }, [history]);
    return (
        <Switch>
			<Route exact path='/'>
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/app'>
                <App location={history}/>
			</Route>
		</Switch>
    );
}

const App = () => {
    const [add, setAdd] = useState(false);
    const [user, setUser] = useState(false);
    const [drinkids, setDrinkids] = useState(FirebaseUser.get.currentUser.drinkids);
    return (
        <Router initialEntries={['/dash', '/history', '/feed', '/blog']} initialIndex={0}>
            <Switch>
                <Route exact path='/dash' >
                    <img 
                        src={FirebaseUser.get.currentUser.user.photoURL}
                        alt="user settings"
                        className="avatar-button"
                        onClick={setUser.bind(null, true)}
                    />
                    <Dashboard /> 
                </Route>
                <Route exact path='/history'>
                    <History drinkids={drinkids} setDrinkids={setDrinkids}/>
                </Route>
                <Route exact path='/feed' >
                    <Feed /> 
                </Route>
                <Route exact path='/blog/:userid' >
                    <Blog/> 
                </Route>
            </Switch>
            <Add open={add} setOpen={setAdd} setDrinkids={setDrinkids}/>
            <User open={user} setOpen={setUser} />
            <Navigation add={add} toggleAdd={() => {setAdd(!add)}} />
        </Router>
    );
}

export default withRouter(Start);
