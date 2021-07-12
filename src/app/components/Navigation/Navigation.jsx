import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

const Navigation = () => {
	const device = useDevice();

	switch (device) {
		case 'desktop':
			return <DesktopNavigation />;
		case 'phone':
		default:
			return <MobileNavigation />;
	}
};

export default memo(Navigation);
