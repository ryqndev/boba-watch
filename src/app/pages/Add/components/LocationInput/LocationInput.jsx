import { memo } from 'react';
import { useDevice } from '../../../../controller/hooks';
import MobileLocationInput from './MobileLocationInput';
import DesktopLocationInput from './DesktopLocationInput';

const LocationInput = props => {
	const device = useDevice();

	return device === 'phone' ? (
		<MobileLocationInput {...props} />
	) : (
		<DesktopLocationInput {...props} />
	);
};

export default memo(LocationInput);
