import { memo } from 'react';
import useDevice from '../../controller/hooks/useDevice';
import MobileHistory from './MobileHistory';
import DesktopHistory from './DesktopHistory';

const History = ({ theme }) => {
	const device = useDevice();

	return device === 'phone' ? <MobileHistory /> : <DesktopHistory theme={theme} />;
};

export default memo(History);
