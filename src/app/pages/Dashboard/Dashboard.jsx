import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice.js';
import MobileDashboard from './MobileDashboard';
import DesktopDashboard from './DesktopDashboard';

const Dashboard = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileDashboard theme={theme}/>
	) : (
		<DesktopDashboard theme={theme} />
	);
};

export default memo(Dashboard);
