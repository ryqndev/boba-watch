import { memo, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onPageView } from '../../../libs/analytics';
import clsx from 'clsx';
import { ReactComponent as Logo } from '../../../../assets/logo-shadow.svg';
import DashboardIcon from '@material-ui/icons/HomeRounded';
// import AddIcon from '@material-ui/icons/AddRounded';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import HistoryIcon from '@material-ui/icons/ListAltRounded';
import MapIcon from '@material-ui/icons/PlaceRounded';
import cn from './DesktopNavigation.module.scss';

const DesktopNavigation = () => {
	let { pathname } = useLocation();

	const tabClassNames = useCallback(
		path => clsx(cn['icon'], path === pathname && cn['selected']),
		[pathname]
	);

	useEffect(() => {
		onPageView(pathname);
	}, [pathname]);

	return (
		<nav className={cn.wrapper}>
			<div className={cn.logo}>
				<Logo />
			</div>
			<div className={cn['icon-holder']}>
				<Link to='/' className={tabClassNames('/')}>
					<DashboardIcon />
				</Link>
				<Link to='/history' className={tabClassNames('/history')}>
					<HistoryIcon />
				</Link>
				<Link to='/add' className={tabClassNames('/add')}>
					<AddIcon />
				</Link>
				<Link to='/map' className={tabClassNames('/map')}>
					<MapIcon />
				</Link>
			</div>
		</nav>
	);
};

export default memo(DesktopNavigation);
