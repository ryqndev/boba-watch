import { lazy, memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
const MobileNavigation = lazy(() => import('./MobileNavigation'));
const DesktopNavigation = lazy(() => import('./DesktopNavigation'));

const Navigation = () => {
	const device = useDevice();

	return device === 'phone' ? <MobileNavigation /> : <DesktopNavigation />;
};

export default memo(Navigation);
