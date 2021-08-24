import { memo, lazy } from 'react';
import useDevice from '../../controller/hooks/useDevice';

const MobileHistory = lazy(() => import('./MobileHistory'));
const DesktopHistory = lazy(() => import('./DesktopHistory'));

const History = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? <MobileHistory /> : <DesktopHistory theme={theme} />;
};

export default memo(History);
