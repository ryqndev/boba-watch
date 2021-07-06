import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	Add,
	Edit,
	Blog,
	Dashboard,
	Feed,
	History,
	Login,
} from './pages';
import { MobileUserIcon, DesktopUserIcon } from './components/UserIcon';
import { Navigation } from './components';
import Theme from './components/globals/theme';
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';
import useAuth from './controller/hooks/useAuth';
import useDevice from './controller/hooks/useDevice';

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
	const { user } = useAuth();
	const device = useDevice();

	if (!user) return <div>Loading...</div>;

	return (
		<>
			{device === 'phone' 
				? <MobileUserIcon />
				: <DesktopUserIcon />}
            
			<Page path='/'>
				<Dashboard />
			</Page>
			<Page path='/history'>
				<History />
			</Page>
			<Page path='/add'>
				<Add />
			</Page>
			<Page path='/edit/:drinkid'>
				<Edit />
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
			<Navigation />
		</>
	);
};

export default App;
