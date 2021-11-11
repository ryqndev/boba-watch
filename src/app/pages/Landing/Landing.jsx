import { memo, lazy } from 'react';
import useDevice from '../../controller/hooks/useDevice.js';

const MobileLanding = lazy(() => import('./MobileLanding'));
const DesktopLanding = lazy(() => import('./DesktopLanding'));

const Landing = () => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileLanding />
	) : (
		<DesktopLanding />
	);
};

export default memo(Landing);
