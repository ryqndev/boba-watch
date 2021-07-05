import React, { useEffect, useState, useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
	Add,
	Edit,
	Blog,
	Dashboard,
	Feed,
	History,
	User,
	Login,
} from './pages';
import { Navigation } from './components';
import Theme from './components/globals/theme';
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';
import useAuth from './controller/hooks/useAuth';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		Theme();
		init(setUser);
	}, []);

	return (
		<AuthUserContext.Provider value={[user, setUser]}>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' component={AuthenticatedRoutes} />
            </Switch>
		</AuthUserContext.Provider>
	);
};
const Page = ({ path, children }) => (
	<Route exact path={path}>
        <div className='page with-user'>{children}</div>
	</Route>
);

const AuthenticatedRoutes = () => {
	const [userModal, setUserModal] = useState(false);
	const { user } = useAuth();

	if (!user) return <div>Loading...</div>;

	return (
		<>
			<Page path='/'>
				<Dashboard />
				<UserIcon setUser={setUserModal} />
			</Page>
			<Page path='/history'>
				<History />
				<UserIcon setUser={setUserModal} />
			</Page>
			<Page path='/add'>
				<Add />
				<UserIcon setUser={setUserModal} />
			</Page>
			<Page path='/edit/:drinkid'>
				<Edit />
				<UserIcon setUser={setUserModal} />
			</Page>
			<Route strict path='/feed'>
				<div className='page'>
					<Feed />
				</div>
			</Route>
			<Route exact path='/blog/:userid'>
				<div className='page'>
					<Blog />
				</div>
			</Route>
			<User open={userModal} setOpen={setUserModal} />
			<Navigation />
		</>
	);
};

const UserIcon = ({ setUser }) => {
	const [user] = useContext(AuthUserContext);

	return (
		<img
			src={user.photoURL}
			alt='user settings'
			className='avatar-button'
			onClick={setUser.bind(null, true)}
		/>
	);
};

export default App;
