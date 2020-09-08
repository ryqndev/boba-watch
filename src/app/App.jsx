import React, { useEffect, useState } from 'react';
import {MemoryRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import {Add, Edit} from './pages/Add';
import User from './pages/User/User';
import History from './pages/History';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Blog from './pages/Blog';
import {Navigation} from './components';
import {CSSTransition} from 'react-transition-group';
import Theme from './components/globals/theme';
import FirebaseUser from './controller/backend';

const Start = ({history}) => {
    useEffect(() => {
        Theme();
        FirebaseUser.init(user => {
            history.push(user ? '/app' : '/login');
        });
        console.log("v2.0.6");
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
const Page = ({path, children}) => (
    <Route exact path={path}>
        {({ match }) => (
            <CSSTransition unmountOnExit mountOnEnter in={match != null} timeout={100} classNames="fade-quick">
                <div className="page">
                    {children}
                </div>
            </CSSTransition>
        )}
    </Route>
);

const App = () => {
    const [user, setUser] = useState(false);
    return (
        <Router initialEntries={['/dash', '/history', '/add', '/feed', '/blog']} initialIndex={0}>
            <Page path="/dash">
                <Dashboard />
                <UserIcon setUser={setUser} />
            </Page>
            <Page path="/history">
                <History />
                <UserIcon setUser={setUser} />
            </Page>
            <Page path="/add">
                <Add />
                <UserIcon setUser={setUser} />
            </Page>
            <Page path="/edit/:drinkid">
                <Edit />
                <UserIcon setUser={setUser} />
            </Page>
            <Route strict path="/feed">
                <div className="page">
                    <Feed />
                </div>
            </Route>
            <Route exact path="/blog/:userid">
                <div className="page">
                    <Blog />
                </div>
            </Route>
            <User open={user} setOpen={setUser} />
            <Navigation />
        </Router>
    );
}
const UserIcon = ({setUser}) => (
    <img 
        src={FirebaseUser.get.currentUser.user.photoURL}
        alt="user settings"
        className="avatar-button"
        onClick={setUser.bind(null, true)}
    />
);

export default withRouter(Start);
