import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import useMetrics from '../../controller/hooks/useMetrics';
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

export default Dashboard;
