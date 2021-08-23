import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

const Navigation = () => {
	const device = useDevice();

	return device === 'phone' ? <MobileNavigation /> : <DesktopNavigation />;
};

export default memo(Navigation);
