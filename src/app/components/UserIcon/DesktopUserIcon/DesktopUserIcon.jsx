import {  memo,useState, useContext } from 'react';
import { Card } from '../../';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import ExpandedUserIcon from './ExpandedUserIcon.jsx';
import cn from './DesktopUserIcon.module.scss';
import clsx from 'clsx';

const DesktopUserIcon = ({theme}) => {
	const [expanded, setExpanded] = useState(false);
	const [user] = useContext(AuthUserContext);

	return (
		<Card className={clsx(cn.container, expanded && cn.expanded)}>
			<time className={cn.date}>{new Date().toDateString()}</time>
			<img
				src={user.photoURL}
				alt='user settings'
				className={cn.avatar}
				onClick={() => setExpanded(prev => !prev)}
			/>
			<ExpandedUserIcon className={clsx(cn.details, expanded && cn.expanded)} theme={theme}/>
		</Card>
	);
};

export default memo(DesktopUserIcon);
