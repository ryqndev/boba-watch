import { memo, lazy } from 'react';
import useDevice from '../../controller/hooks/useDevice';
const MobileLocator = lazy(() => import('./MobileLocator'));
const DesktopLocator = lazy(() => import('./DesktopLocator'));

const Locator = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileLocator theme={theme} />
	) : (
		<DesktopLocator theme={theme} />
	);
};

export default memo(Locator);
