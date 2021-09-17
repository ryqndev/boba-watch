import { memo, useState, useContext } from 'react';
import { Card } from '../../';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import ExpandedUserIcon from './ExpandedUserIcon.jsx';
import cn from './DesktopUserIcon.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const DesktopUserIcon = ({ theme }) => {
	const { i18n } = useTranslation();
	const [expanded, setExpanded] = useState(false);
	const [user] = useContext(AuthUserContext);

	return (
		<Card className={clsx(cn.container, expanded && cn.expanded)}>
			<time className={cn.date}>
				{new Date().toLocaleDateString(i18n.language, {
					weekday: 'short',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})}
			</time>
			<img
				src={user?.photoURL}
				alt=''
				className={cn.avatar}
				onClick={() => setExpanded(prev => !prev)}
			/>
			<ExpandedUserIcon
				className={clsx(cn.details, expanded && cn.expanded)}
				theme={theme}
			/>
		</Card>
	);
};

export default memo(DesktopUserIcon);
