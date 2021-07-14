import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import DesktopUserIcon from './DesktopUserIcon';
import MobileUserIcon from './MobileUserIcon';

const UserIcon = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileUserIcon theme={theme} />
	) : (
		<DesktopUserIcon theme={theme} />
	);
};

export default memo(UserIcon);
