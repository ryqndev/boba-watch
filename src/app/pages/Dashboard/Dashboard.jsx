import {memo} from 'react';
import useDevice from '../../controller/hooks/useDevice.js';
import MobileDashboard from './MobileDashboard';
import DesktopDashboard from './DesktopDashboard';

const Dashboard = () => {
	const device = useDevice();

    switch(device) {
        case 'desktop':
            return <DesktopDashboard />;
        case 'phone': 
        default:
            return <MobileDashboard />;
    }
};

export default memo(Dashboard);
