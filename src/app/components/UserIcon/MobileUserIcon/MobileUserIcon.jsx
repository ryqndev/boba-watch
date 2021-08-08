import { memo, useState, useContext } from 'react';
import AuthUserContext from '../../../controller/contexts/AuthUserContext';
import User from '../User';
import cn from './MobileUserIcon.module.scss';

const MobileUserIcon = ({ theme }) => {
	const [userModal, setUserModal] = useState(false);
	const [user] = useContext(AuthUserContext);

	return (
		<>
			<img
				src={user.photoURL}
				alt='user settings'
				className={cn.avatar}
				onClick={() => setUserModal(true)}
			/>

			<User open={userModal} setOpen={setUserModal} theme={theme} />
		</>
	);
};

export default memo(MobileUserIcon);
