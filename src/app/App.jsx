import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import clsx from 'clsx';
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';
import useAuth from './controller/hooks/useAuth';
import useTheme from './controller/hooks/useTheme';
import { Login, Blog } from './pages';
import Navigation from './components/Navigation';
import UserIcon from './components/UserIcon';
import cn from './App.module.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { logout } from './libs/firestore';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const History = lazy(() => import('./pages/History'));
const Add = lazy(() => import('./pages/Add'));
const Locator = lazy(() => import('./pages/Locator'));

const App = () => {
	const [user, setUser] = useState('logging-in');

	useEffect(() => {
		init(setUser);
	}, []);

	return (
		<AuthUserContext.Provider value={[user, setUser]}>
			<Suspense fallback={<div></div>}>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<AuthenticatedRoutes />} />
				</Routes>
			</Suspense>
		</AuthUserContext.Provider>
	);
};

const AuthenticatedRoutes = () => {
	const { user } = useAuth();
	const { theme, ...themeOptions } = useTheme();

	if (!user || user === 'logging-in')
		return (
			<div className={clsx(cn['page-background'], cn['loading-message'])}>
				Logging you in...
				<div className={cn['center-btn']}>
					<button onClick={logout}>cancel</button>
				</div>
			</div>
		);

	return (
		<>
			<UserIcon theme={{ theme, ...themeOptions }} />
			<Suspense fallback={<div className={cn['page-background']}></div>}>
				<Routes>
					<Route path='history' element={<History theme={theme} />} />
					<Route path='add' element={<Add />} />
					<Route path='edit/:id' element={<Add />} />
					<Route path='map' element={<Locator theme={theme} />} />
					<Route path='blog' element={<Blog />} />
					<Route path='*' element={<Dashboard theme={theme} />} />
				</Routes>
			</Suspense>
			<Navigation />
		</>
	);
};

export default App;
