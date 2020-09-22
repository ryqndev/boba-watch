import React, { useEffect, useState, useContext } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
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
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';

const Start = ({history}) => {
    const [authUser, setAuthUser] = useState();
    useEffect(() => {
        Theme();
        init(user => {
            setAuthUser(user);
            console.log(user);
            history.push(user ? '/app' : '/login');
        });
        console.log("v2.07");
    }, [history]);

    return (
        <AuthUserContext.Provider value={[authUser, setAuthUser]}> 
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
        </AuthUserContext.Provider> 
    );
}
const Page = ({path, children}) => (
    <Route exact path={path}>
        {({ match }) => (
            <CSSTransition unmountOnExit mountOnEnter in={match != null} timeout={100} classNames="fade-quick">
                <div className="page with-user">
                    {children}
                </div>
            </CSSTransition>
        )}
    </Route>
);

const App = () => {
    const [user, setUser] = useState(false);
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Page path="/">
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
const UserIcon = ({setUser}) => {
    const [authUser] = useContext(AuthUserContext);

    return (
        <img 
            src={authUser.photoURL}
            alt="user settings"
            className="avatar-button"
            onClick={setUser.bind(null, true)}
        />
    );
};

export default withRouter(Start);
