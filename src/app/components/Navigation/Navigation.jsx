import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ExploreIcon from '@material-ui/icons/ExploreRounded';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import {ReactComponent as Logo} from '../../../assets/logo-shadow.svg';
import HistoryIcon from '@material-ui/icons/ListAltRounded';
import PublicIcon from '@material-ui/icons/FaceRounded';
import { onPageView } from '../../libs/analytics';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import cn from './Navigation.module.scss';

const Navigation = ({ history }) => {
	const [tab, setTab] = useState(history.location.pathname);
	const isTab = path => (path === tab ? ' ' + cn['selected'] : '');
	const [authUser] = useContext(AuthUserContext);

	useEffect(() => {
		let path = history.location.pathname;
		setTab(path);
		onPageView(path);
	}, [history.location.pathname]);

	return (
		<nav className={cn.wrapper}>
            <div className={cn.logo}>
                <Logo />
            </div>
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
				<Link to='/feed'>
					<div className={cn['icon'] + isTab('/feed')}>
						<ExploreIcon />
						<p className={cn['label']}>feed</p>
					</div>
				</Link>
				<Link to={'/blog/' + authUser.uid}>
					<div className={cn['icon'] + isTab('/blog/' + authUser.uid)}>
						<PublicIcon />
						<p className={cn['label']}>blog</p>
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default withRouter(Navigation);
