import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import init from './controller/LoginFlow';
import AuthUserContext from './controller/contexts/AuthUserContext';
import useAuth from './controller/hooks/useAuth';
import useTheme from './controller/hooks/useTheme';
import Login from './pages/Login.jsx';
import Navigation from './components/Navigation';
import UserIcon from './components/UserIcon';
import cn from './App.module.scss';
import 'react-markdown-editor-lite/lib/index.css';

const History = lazy(() => import('./pages/History'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Add = lazy(() => import('./pages/Add'));
const Locator = lazy(() => import('./pages/Locator'));
const Blog = lazy(() => import('./pages/Blog'));

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
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
			<Suspense fallback={<div className={cn['page-background']}></div>}>
				<Routes>
					<Route path='/' element={<Dashboard theme={theme} />} />
					<Route path='history' element={<History theme={theme} />} />
					<Route path='add' element={<Add />} />
					<Route path='edit/:id' element={<Add />} />
					<Route path='map' element={<Locator theme={theme} />} />
					<Route path='blog/:userid' element={<Blog />} />
				</Routes>
			</Suspense>
			<Navigation />
		</>
	);
};

export default App;
