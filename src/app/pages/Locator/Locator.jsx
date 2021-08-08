import useDevice from '../../controller/hooks/useDevice';
import DesktopLocator from './DesktopLocator';
import MobileLocator from './MobileLocator';

const Locator = ({theme}) => {
	const device = useDevice();

	return device === 'phone' ? <MobileLocator theme={theme}/> : <DesktopLocator theme={theme} />;}

export default Locator;