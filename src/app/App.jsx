import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Add, Blog, Dashboard, Feed, History, Locator, Login } from './pages';
import { Navigation, UserIcon } from './components';
import Theme from './components/globals/theme';
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';
import useAuth from './controller/hooks/useAuth';
import useTheme from './controller/hooks/useTheme';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		Theme();
		init(setUser);
	}, []);

	return (
		<AuthUserContext.Provider value={[user, setUser]}>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<AuthenticatedRoutes />} />
			</Routes>
		</AuthUserContext.Provider>
	);
};

const AuthenticatedRoutes = () => {
	const { user } = useAuth();
	const { theme, ...themeOptions } = useTheme();

	if (!user) return <div>Loading...</div>;

	return (
		<>
			<UserIcon theme={{ theme, ...themeOptions }} />
			<Routes>
				<Route path='/' element={<Dashboard theme={theme} />} />
				<Route path='history' element={<History />} />
				<Route path='add' element={<Add />} />
				<Route path='edit/:id' element={<Add />} />
				<Route path='map' element={<Locator theme={theme} />} />
				<Route
					path='feed'
					element={
						<div className='page'>
							<Feed />
						</div>
					}
				/>
				<Route
					path='blog/:userid'
					element={
						<div className='page'>
							<Blog />
						</div>
					}
				/>
			</Routes>
			<Navigation />
		</>
	);
};

export default App;
