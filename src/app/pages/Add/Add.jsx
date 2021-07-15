import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import MobileAdd from './MobileAdd';
import DesktopAdd from './DesktopAdd';

const Add = () => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileAdd />
	) : (
		<DesktopAdd />
	);
};

export default memo(Add);
