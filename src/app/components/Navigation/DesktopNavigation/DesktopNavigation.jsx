import { memo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onPageView } from '../../../libs/analytics';
import clsx from 'clsx';
import { ReactComponent as Logo } from '../../../../assets/logo-shadow.svg';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import HistoryIcon from '@material-ui/icons/ListAltRounded';
import MapIcon from '@material-ui/icons/PlaceRounded';
import cn from './DesktopNavigation.module.scss';

const tabs = [
	{ path: '/', icon: <DashboardIcon /> },
	{ path: '/history', icon: <HistoryIcon /> },
	{ path: '/add', icon: <AddIcon /> },
	{ path: '/map', icon: <MapIcon /> },
];

const DesktopNavigation = () => {
	let { pathname } = useLocation();

	useEffect(() => {
		onPageView(pathname);
	}, [pathname]);

	return (
		<nav className={cn.container}>
			<div className={cn.logo}>
				<Logo />
			</div>
			<div className={cn['icon-holder']}>
				{tabs.map(({ path, icon }) => (
					<Link
						key={path}
						to={path}
						className={clsx(
							cn['icon'],
							path === pathname && cn['selected']
						)}
					>
						{icon}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default memo(DesktopNavigation);
