import { useState, useContext } from 'react';
import { Card } from '../../';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import User from '../User';
import cn from './DesktopUserIcon.module.scss';

const DesktopUserIcon = () => {
	const [userModal, setUserModal] = useState(false);
	const [user] = useContext(AuthUserContext);

	return (
		<Card className={cn.wrapper}>
			<time className={cn.date}>{new Date().toDateString()}</time>
			<img
				src={user.photoURL}
				alt='user settings'
				className={cn.avatar}
				onClick={() => setUserModal(true)}
			/>
			<User open={userModal} setOpen={setUserModal} />
		</Card>
	);
};

export default DesktopUserIcon;
