import { memo, lazy } from 'react';
import useDevice from '../../controller/hooks/useDevice.js';

const MobileDashboard = lazy(() => import('./MobileDashboard'));
const DesktopDashboard = lazy(() => import('./DesktopDashboard'));

const Dashboard = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileDashboard theme={theme} />
	) : (
		<DesktopDashboard theme={theme} />
	);
};

export default memo(Dashboard);
