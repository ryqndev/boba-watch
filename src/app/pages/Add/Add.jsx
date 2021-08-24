import { memo, lazy } from 'react';
import useDevice from '../../controller/hooks/useDevice';

const MobileAdd = lazy(() => import('./MobileAdd'));
const DesktopAdd = lazy(() => import('./DesktopAdd'));

const Add = () => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileAdd />
	) : (
		<DesktopAdd />
	);
};

export default memo(Add);
