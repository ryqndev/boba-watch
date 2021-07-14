import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import MobileAdd from './MobileAdd';
import DesktopAdd from './DesktopAdd';

const Add = props => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileAdd {...props} />
	) : (
		<DesktopAdd {...props} />
	);
};

export default memo(Add);
