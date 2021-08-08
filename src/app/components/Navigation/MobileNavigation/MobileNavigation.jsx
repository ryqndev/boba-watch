import { memo, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MapIcon from '@material-ui/icons/PlaceRounded';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import HistoryIcon from '@material-ui/icons/ListAltRounded';
import PublicIcon from '@material-ui/icons/FaceRounded';
import { onPageView } from '../../../libs/analytics';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import cn from './MobileNavigation.module.scss';

const MobileNavigation = () => {
	const { pathname } = useLocation();
	const isTab = path => (path === pathname ? ' ' + cn['selected'] : '');
	const [authUser] = useContext(AuthUserContext);

	useEffect(() => {
		onPageView(pathname);
	}, [pathname]);

	return (
		<nav className={cn.container}>
			<div className={cn['icon-holder']}>
				<Link to='/'>
					<div className={cn['icon'] + isTab('/')}>
						<DashboardIcon />
						<p className={cn['label']}>home</p>
					</div>
				</Link>
				<Link to='/history'>
					<div className={cn['icon'] + isTab('/history')}>
						<HistoryIcon />
						<p className={cn['label']}>history</p>
					</div>
				</Link>
				<Link to='/add'>
					<div className={cn['add-icon'] + isTab('/add')}>
						<AddIcon className={cn['add']} />
					</div>
				</Link>
				<Link to='/map'>
					<div className={cn['icon'] + isTab('/map')}>
						<MapIcon />
						<p className={cn['label']}>locator</p>
					</div>
				</Link>
				<Link to={'/blog/' + authUser.uid}>
					<div
						className={cn['icon'] + isTab('/blog/' + authUser.uid)}
					>
						<PublicIcon />
						<p className={cn['label']}>blog</p>
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default memo(MobileNavigation);
